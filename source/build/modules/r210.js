<style id="r210-css">
/* ============ R210 · STRONGER MODELS FOR LARGER COMPUTERS (6.10.2) ============ */
#lineupCard .lu-large{font-size:12.5px;line-height:1.5;color:var(--ink-2);margin:-4px 0 12px;max-width:72ch}
#lineupCard .lu-large b{color:var(--ink);font-weight:600}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p210"]="started";}catch(_){}
/* ============ R210 · STRONGER MODELS FOR LARGER COMPUTERS (6.10.2, 3 November 2026) ============
   Her words (3 November 2026): "I also want Ingenium to be able to run stronger models and be strong enough to run on larger
   computers with far more RAM than 64GB. I don't want Ingenium to be capped at 64 GB RAM in case I get better hardware that are far
   more capable in the future"; and: "It should not be limited to models strenghts or RAM or anything else, if a user has that
   hardware and is able to use it".
   Until now the houses' lists stopped at what a computer of 48 to 64 GB holds: a computer with 128 GB or 1 TB got the same models.
   This module:
   1. adds seventeen larger models, from 96 GB of memory to 3 TB, read from Hugging Face on 3 November 2026 (rounds 8 and 8b of
      .github/workflows/lineup-sources.yml, then checked again file by file): every file's name, size and SHA-256 as its repository
      lists them, and each model's kind read from its own file's first bytes (all are kinds the engine of this release, llama.cpp
      b11321, lists in its src/llama-arch.cpp). Models over 50 GB come in parts (Hugging Face keeps no larger file): each part is
      listed, fetched and checked, and the computer app keeps them side by side as the engine reads them (desktop/app_parts_6102.py);
   2. puts them at the head of each house's list on computers, so that the memory rule (lineupNeedGB, lineupUsableGB, unchanged)
      gives each house the largest model that fits: Magister the largest general model, Scriba the quickest (fewest parameters at
      work on each word), Faber the coders. The order goes by what can be checked (size, date, parameters at work, and a 4-bit copy
      before a 2-bit one of a larger model), not by comparing makers' scores, which each maker measures against different rivals;
   3. gives each its maker's own sampling settings where its card gives them (where it gives none, Ingenium's own are used);
   4. says on the Models page that there is no ceiling on memory.
   Nothing here was run end to end: no machine within reach has the memory. The files, their fingerprints and their kinds were
   checked; how fast each runs on a given computer was not measured. */
(function r210Large(){
"use strict";
if(typeof ING_LINEUP==="undefined"||!ING_LINEUP.models||!ING_LINEUP.devices)return;
var M=ING_LINEUP.models,D=ING_LINEUP.devices;

/* ---------- 1. the models (generated from the listing; do not edit the sizes or fingerprints by hand) ---------- */
var LARGE={
 "qwen3-next-80b-a3b-thinking": {
  "name": "Qwen3-Next 80B-A3B Thinking",
  "maker": "Qwen (Alibaba)",
  "params": 80,
  "thinks": true,
  "file": "Qwen3-Next-80B-A3B-Thinking-Q4_K_M.gguf",
  "size": 48506101920,
  "sha256": "d9837b0a6ae39bb30849a264dfedec2c4d94e249833c6fc51db7df54db2d964c",
  "url": "https://huggingface.co/unsloth/Qwen3-Next-80B-A3B-Thinking-GGUF/resolve/main/Qwen3-Next-80B-A3B-Thinking-Q4_K_M.gguf",
  "page": "https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Thinking",
  "licence": "Apache 2.0",
  "licenceUrl": "https://www.apache.org/licenses/LICENSE-2.0",
  "why": "Qwen's Qwen3-Next in its thinking form (September 2025), under Apache 2.0: 80B parameters, of which 3B work on each word, so it answers quickly for its size, and a memory of 262,144 tokens. It is made to reason before it answers. Its card's settings for this form were not read, so Ingenium uses its own. 48.5 GB in one file (Q4_K_M), needing about 51.3 GB of memory: for a computer with 96 GB or more.",
  "large": true,
  "active": 3
 },
 "qwen3-coder-next": {
  "name": "Qwen3-Coder-Next",
  "maker": "Qwen (Alibaba)",
  "params": 80,
  "thinks": false,
  "file": "Qwen3-Coder-Next-Q4_K_M.gguf",
  "size": 48528320544,
  "sha256": "9e6032d2f3b50a60f17ce8bf5a1d85c71af9b53b89c7978020ae7c660f29b090",
  "url": "https://huggingface.co/unsloth/Qwen3-Coder-Next-GGUF/resolve/main/Qwen3-Coder-Next-Q4_K_M.gguf",
  "page": "https://huggingface.co/Qwen/Qwen3-Coder-Next",
  "licence": "Apache 2.0",
  "licenceUrl": "https://www.apache.org/licenses/LICENSE-2.0",
  "why": "Qwen's coding model of February 2026, under Apache 2.0: 80B parameters with 3B at work on each word, and a memory of 262,144 tokens. It answers without a thinking pass (its card: non-thinking only), and Ingenium uses the settings its maker recommends (temperature 1.0, top_p 0.95, top_k 40). 48.5 GB in one file (Q4_K_M), needing about 51.3 GB of memory: for a computer with 96 GB or more.",
  "large": true,
  "active": 3
 },
 "nemotron-3.5-bolt-74b-a9b": {
  "name": "Nemotron 3.5 Bolt 74B-A9B",
  "maker": "NVIDIA",
  "params": 74,
  "thinks": true,
  "file": "NVIDIA-Nemotron-3.5-Bolt-74B-A9B-UD-Q4_K_XL-00001-of-00003.gguf",
  "size": 50219478368,
  "sha256": "d6f33b5e8a49ea57a0a3ae922dfd0b3033a19429993d3215fc4992f4270aa2df",
  "url": "https://huggingface.co/unsloth/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-GGUF/resolve/main/UD-Q4_K_XL/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-UD-Q4_K_XL-00001-of-00003.gguf",
  "page": "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16",
  "licence": "Other: NVIDIA's OpenMDW 1.1 (read it on its page)",
  "licenceUrl": "https://openmdw.ai/license/1-1/",
  "why": "NVIDIA's Nemotron 3.5 Bolt (October 2026): 74B parameters with 9B active, and a memory of up to 256K tokens, under the OpenMDW 1.1 licence. Its thinking is switched in its template, so the Thinking key turns it on and off; Ingenium uses its card's settings (temperature 1.0, top_p 0.95). 50.2 GB in 3 parts (UD-Q4_K_XL), needing about 53.1 GB of memory: for a computer with 96 GB or more.",
  "large": true,
  "active": 9,
  "parts": [
   {
    "file": "NVIDIA-Nemotron-3.5-Bolt-74B-A9B-UD-Q4_K_XL-00001-of-00003.gguf",
    "size": 7876160,
    "sha256": "d6f33b5e8a49ea57a0a3ae922dfd0b3033a19429993d3215fc4992f4270aa2df",
    "url": "https://huggingface.co/unsloth/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-GGUF/resolve/main/UD-Q4_K_XL/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-UD-Q4_K_XL-00001-of-00003.gguf"
   },
   {
    "file": "NVIDIA-Nemotron-3.5-Bolt-74B-A9B-UD-Q4_K_XL-00002-of-00003.gguf",
    "size": 49524981280,
    "sha256": "93c8485db6f9e9d26085acc368ca3b0993a36aa870e8f8b7748c1fbd174c6276",
    "url": "https://huggingface.co/unsloth/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-GGUF/resolve/main/UD-Q4_K_XL/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-UD-Q4_K_XL-00002-of-00003.gguf"
   },
   {
    "file": "NVIDIA-Nemotron-3.5-Bolt-74B-A9B-UD-Q4_K_XL-00003-of-00003.gguf",
    "size": 686620928,
    "sha256": "f97b7a5443b3f77150a1bf7bac6c00862411ee2f26b7bf57a599fb61dbe867df",
    "url": "https://huggingface.co/unsloth/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-GGUF/resolve/main/UD-Q4_K_XL/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-UD-Q4_K_XL-00003-of-00003.gguf"
   }
  ]
 },
 "qwen3.5-122b-a10b-compact": {
  "name": "Qwen3.5 122B-A10B · Compact",
  "maker": "Qwen (Alibaba)",
  "params": 122,
  "thinks": true,
  "file": "Qwen3.5-122B-A10B-UD-Q3_K_XL-00001-of-00003.gguf",
  "size": 56970536480,
  "sha256": "e70ec702564603c9b24b03d7b456fb6ed7b9b18fc32867e350a29961c45fd3ed",
  "url": "https://huggingface.co/unsloth/Qwen3.5-122B-A10B-GGUF/resolve/main/UD-Q3_K_XL/Qwen3.5-122B-A10B-UD-Q3_K_XL-00001-of-00003.gguf",
  "page": "https://huggingface.co/Qwen/Qwen3.5-122B-A10B",
  "licence": "Apache 2.0",
  "licenceUrl": "https://www.apache.org/licenses/LICENSE-2.0",
  "why": "Qwen3.5 122B-A10B (February 2026), under Apache 2.0: 122B parameters, 10B at work on each word, a memory of 262,144 tokens (its card advises keeping at least 128K for its thinking), and it reads pictures. It thinks first by default; the Thinking key turns that off. This is the compact copy, Unsloth's dynamic 3-bit (UD-Q3_K_XL), a little less exact than the usual file. 57.0 GB in 3 parts (UD-Q3_K_XL), needing about 60.1 GB of memory: for a computer with 96 GB or more.",
  "large": true,
  "active": 10,
  "parts": [
   {
    "file": "Qwen3.5-122B-A10B-UD-Q3_K_XL-00001-of-00003.gguf",
    "size": 10943552,
    "sha256": "e70ec702564603c9b24b03d7b456fb6ed7b9b18fc32867e350a29961c45fd3ed",
    "url": "https://huggingface.co/unsloth/Qwen3.5-122B-A10B-GGUF/resolve/main/UD-Q3_K_XL/Qwen3.5-122B-A10B-UD-Q3_K_XL-00001-of-00003.gguf"
   },
   {
    "file": "Qwen3.5-122B-A10B-UD-Q3_K_XL-00002-of-00003.gguf",
    "size": 49772068672,
    "sha256": "94e50d2d9e65e216dc3ced9cd8cae8a5036e9c27b651c8f63ad7eb785a421f01",
    "url": "https://huggingface.co/unsloth/Qwen3.5-122B-A10B-GGUF/resolve/main/UD-Q3_K_XL/Qwen3.5-122B-A10B-UD-Q3_K_XL-00002-of-00003.gguf"
   },
   {
    "file": "Qwen3.5-122B-A10B-UD-Q3_K_XL-00003-of-00003.gguf",
    "size": 7187524256,
    "sha256": "fd42cf1f8bae5ce0b4d4d3f39cc066745c41dfd7311785c72745887700377b06",
    "url": "https://huggingface.co/unsloth/Qwen3.5-122B-A10B-GGUF/resolve/main/UD-Q3_K_XL/Qwen3.5-122B-A10B-UD-Q3_K_XL-00003-of-00003.gguf"
   }
  ],
  "vision": {
   "repos": [
    "unsloth/Qwen3.5-122B-A10B-GGUF"
   ],
   "prefer": [
    "mmproj-F16.gguf",
    "mmproj-BF16.gguf"
   ]
  }
 },
 "gpt-oss-120b": {
  "name": "gpt-oss-120b",
  "maker": "OpenAI",
  "params": 117,
  "thinks": true,
  "file": "gpt-oss-120b-MXFP4.gguf",
  "size": 63387346208,
  "sha256": "582bd40f6886200101f4c4ed9f25f3fe80cc14c86e9e2b37746cd8904a0c622d",
  "url": "https://huggingface.co/ggml-org/gpt-oss-120b-GGUF/resolve/main/gpt-oss-120b-MXFP4.gguf",
  "page": "https://huggingface.co/openai/gpt-oss-120b",
  "licence": "Apache 2.0",
  "licenceUrl": "https://www.apache.org/licenses/LICENSE-2.0",
  "why": "OpenAI's open model of August 2025, under Apache 2.0: 117B parameters with 5.1B active (its card), so it is quick for its size, and a memory of 131,072 tokens. It reasons before it answers. This is its own 4-bit form (MXFP4), as llama.cpp's publishers made it. Its card's sampling settings were not read, so Ingenium uses its own. 63.4 GB in one file (MXFP4), needing about 66.8 GB of memory: for a computer with 128 GB or more.",
  "large": true,
  "active": 5.1
 },
 "qwen3.5-122b-a10b": {
  "name": "Qwen3.5 122B-A10B",
  "maker": "Qwen (Alibaba)",
  "params": 122,
  "thinks": true,
  "file": "Qwen3.5-122B-A10B-Q4_K_M-00001-of-00003.gguf",
  "size": 76536964608,
  "sha256": "467c9bd92ea518539cf75bf5a5fbfbd35e9a0b40d766ccaa67bf120e12041df3",
  "url": "https://huggingface.co/unsloth/Qwen3.5-122B-A10B-GGUF/resolve/main/Q4_K_M/Qwen3.5-122B-A10B-Q4_K_M-00001-of-00003.gguf",
  "page": "https://huggingface.co/Qwen/Qwen3.5-122B-A10B",
  "licence": "Apache 2.0",
  "licenceUrl": "https://www.apache.org/licenses/LICENSE-2.0",
  "why": "Qwen3.5 122B-A10B (February 2026), under Apache 2.0: 122B parameters, 10B at work on each word, a memory of 262,144 tokens (its card advises keeping at least 128K for its thinking), and it reads pictures. It thinks first by default; the Thinking key turns that off, and Ingenium uses its card's settings for each. 76.5 GB in 3 parts (Q4_K_M), needing about 80.5 GB of memory: for a computer with 128 GB or more.",
  "large": true,
  "active": 10,
  "parts": [
   {
    "file": "Qwen3.5-122B-A10B-Q4_K_M-00001-of-00003.gguf",
    "size": 10943552,
    "sha256": "467c9bd92ea518539cf75bf5a5fbfbd35e9a0b40d766ccaa67bf120e12041df3",
    "url": "https://huggingface.co/unsloth/Qwen3.5-122B-A10B-GGUF/resolve/main/Q4_K_M/Qwen3.5-122B-A10B-Q4_K_M-00001-of-00003.gguf"
   },
   {
    "file": "Qwen3.5-122B-A10B-Q4_K_M-00002-of-00003.gguf",
    "size": 49968146912,
    "sha256": "90db14846413aebdac365b57206441437cac5f7e5037d94b325f0167f902e6e7",
    "url": "https://huggingface.co/unsloth/Qwen3.5-122B-A10B-GGUF/resolve/main/Q4_K_M/Qwen3.5-122B-A10B-Q4_K_M-00002-of-00003.gguf"
   },
   {
    "file": "Qwen3.5-122B-A10B-Q4_K_M-00003-of-00003.gguf",
    "size": 26557874144,
    "sha256": "e3c24b8ebec070bb4f69ea0aca25a16531da7440cd515529953e046882901f97",
    "url": "https://huggingface.co/unsloth/Qwen3.5-122B-A10B-GGUF/resolve/main/Q4_K_M/Qwen3.5-122B-A10B-Q4_K_M-00003-of-00003.gguf"
   }
  ],
  "vision": {
   "repos": [
    "unsloth/Qwen3.5-122B-A10B-GGUF"
   ],
   "prefer": [
    "mmproj-F16.gguf",
    "mmproj-BF16.gguf"
   ]
  }
 },
 "qwen3.8-flash-next": {
  "name": "Qwen3.8 Flash Next",
  "maker": "Qwen (Alibaba)",
  "params": 177,
  "thinks": true,
  "file": "Qwen3.8-Flash-Next-UD-Q4_K_XL-00001-of-00004.gguf",
  "size": 111334654784,
  "sha256": "4448186216b3af4cc558bbce2c3213f01608f8f8b2e5267a9767971dd3ec8082",
  "url": "https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF/resolve/main/UD-Q4_K_XL/Qwen3.8-Flash-Next-UD-Q4_K_XL-00001-of-00004.gguf",
  "page": "https://huggingface.co/Qwen/Qwen3.8-Flash-Next",
  "licence": "Other: Qwen's community licence 1.0 (read it on its page)",
  "licenceUrl": "https://huggingface.co/Qwen/Qwen3.8-Flash-Next/blob/main/LICENSE",
  "why": "Qwen3.8 Flash Next (August 2026): its card gives 125B parameters with 6B active, plus 51B of n-gram embedding and 4B for predicting several words at once, and a memory of 262,144 tokens; its licence is Qwen's community licence 1.0. It reads pictures. It thinks first by default; Ingenium uses its card's settings for thinking and for plain answers. 111.3 GB in 4 parts (UD-Q4_K_XL), needing about 116.8 GB of memory: for a computer with 192 GB or more.",
  "large": true,
  "active": 6,
  "parts": [
   {
    "file": "Qwen3.8-Flash-Next-UD-Q4_K_XL-00001-of-00004.gguf",
    "size": 10946624,
    "sha256": "4448186216b3af4cc558bbce2c3213f01608f8f8b2e5267a9767971dd3ec8082",
    "url": "https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF/resolve/main/UD-Q4_K_XL/Qwen3.8-Flash-Next-UD-Q4_K_XL-00001-of-00004.gguf"
   },
   {
    "file": "Qwen3.8-Flash-Next-UD-Q4_K_XL-00002-of-00004.gguf",
    "size": 49859583136,
    "sha256": "3f342f1c1580473f1ee94ddd5b28206e8c07a70fa1a366f59d1d6c922919a6c9",
    "url": "https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF/resolve/main/UD-Q4_K_XL/Qwen3.8-Flash-Next-UD-Q4_K_XL-00002-of-00004.gguf"
   },
   {
    "file": "Qwen3.8-Flash-Next-UD-Q4_K_XL-00003-of-00004.gguf",
    "size": 49376141504,
    "sha256": "56758f40269cad5cd9b0d3d6fbae0f40f6d5be6de49e4ab392dbe83157d9cbd3",
    "url": "https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF/resolve/main/UD-Q4_K_XL/Qwen3.8-Flash-Next-UD-Q4_K_XL-00003-of-00004.gguf"
   },
   {
    "file": "Qwen3.8-Flash-Next-UD-Q4_K_XL-00004-of-00004.gguf",
    "size": 12087983520,
    "sha256": "753bda48b98ba4f1636134a90a967de1b2d3908a236c026e464777342e53510a",
    "url": "https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF/resolve/main/UD-Q4_K_XL/Qwen3.8-Flash-Next-UD-Q4_K_XL-00004-of-00004.gguf"
   }
  ],
  "vision": {
   "repos": [
    "unsloth/Qwen3.8-Flash-Next-GGUF"
   ],
   "prefer": [
    "mmproj-F16.gguf",
    "mmproj-BF16.gguf"
   ]
  }
 },
 "glm-5.3-flash-compact": {
  "name": "GLM-5.3 Flash · Compact",
  "maker": "Z.ai",
  "params": 320,
  "thinks": true,
  "file": "GLM-5.3-Flash-UD-Q3_K_XL-00001-of-00004.gguf",
  "size": 147535922080,
  "sha256": "be89305a221c1449cf9a5a84b5c492520a7fb23a3af1b2178a20ecf0b6ecae76",
  "url": "https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF/resolve/main/UD-Q3_K_XL/GLM-5.3-Flash-UD-Q3_K_XL-00001-of-00004.gguf",
  "page": "https://huggingface.co/zai-org/GLM-5.3-Flash",
  "licence": "MIT",
  "licenceUrl": "https://opensource.org/license/mit",
  "why": "Z.ai's GLM-5.3 Flash (August 2026), under MIT: 320B parameters with 18B active (its card) and a memory of 1,048,576 tokens. Its card reports its coding and agent work in detail; its maker's tests used temperature 1.0 and top_p 0.95, which Ingenium uses. This is the compact copy, Unsloth's dynamic 3-bit (UD-Q3_K_XL). 147.5 GB in 4 parts (UD-Q3_K_XL), needing about 154.6 GB of memory: for a computer with 256 GB or more.",
  "large": true,
  "active": 18,
  "parts": [
   {
    "file": "GLM-5.3-Flash-UD-Q3_K_XL-00001-of-00004.gguf",
    "size": 9429984,
    "sha256": "be89305a221c1449cf9a5a84b5c492520a7fb23a3af1b2178a20ecf0b6ecae76",
    "url": "https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF/resolve/main/UD-Q3_K_XL/GLM-5.3-Flash-UD-Q3_K_XL-00001-of-00004.gguf"
   },
   {
    "file": "GLM-5.3-Flash-UD-Q3_K_XL-00002-of-00004.gguf",
    "size": 49609243584,
    "sha256": "310b5bef056c5cc61d98e1845feac97e35d0a5aa412fca354b6cd597d66b486e",
    "url": "https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF/resolve/main/UD-Q3_K_XL/GLM-5.3-Flash-UD-Q3_K_XL-00002-of-00004.gguf"
   },
   {
    "file": "GLM-5.3-Flash-UD-Q3_K_XL-00003-of-00004.gguf",
    "size": 49623486016,
    "sha256": "eacaab11505a25f00e78b4dce64795cc38bc25839372ec586745af0261673a0c",
    "url": "https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF/resolve/main/UD-Q3_K_XL/GLM-5.3-Flash-UD-Q3_K_XL-00003-of-00004.gguf"
   },
   {
    "file": "GLM-5.3-Flash-UD-Q3_K_XL-00004-of-00004.gguf",
    "size": 48293762496,
    "sha256": "c650640c9f94f5f1662ac84b803405db3265ee9fc24ffe56670bb0eafd632d00",
    "url": "https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF/resolve/main/UD-Q3_K_XL/GLM-5.3-Flash-UD-Q3_K_XL-00004-of-00004.gguf"
   }
  ]
 },
 "deepseek-v4-flash": {
  "name": "DeepSeek V4 Flash",
  "maker": "DeepSeek",
  "params": 284,
  "thinks": true,
  "file": "DeepSeek-V4-Flash-MXFP4-00001-of-00002.gguf",
  "size": 154991538592,
  "sha256": "aa52d7c0ba08350780e05d74f98f2e67be03dd6862f5878545d754ed56557dae",
  "url": "https://huggingface.co/ggml-org/DeepSeek-V4-Flash-GGUF/resolve/main/DeepSeek-V4-Flash-MXFP4-00001-of-00002.gguf",
  "page": "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash",
  "licence": "MIT",
  "licenceUrl": "https://opensource.org/license/mit",
  "why": "DeepSeek V4 Flash (July 2026), under MIT: 284B parameters (its file's count) and a memory of 1,048,576 tokens. This is the 4-bit form (MXFP4) llama.cpp's own publishers made. DeepSeek's cards for V4 Pro and V4.1 Flash recommend temperature 1.0 and top_p 1.0 outside agent work; Ingenium uses them for V4 Flash too. 155.0 GB in 2 parts (MXFP4), needing about 162.4 GB of memory: for a computer with 256 GB or more.",
  "large": true,
  "parts": [
   {
    "file": "DeepSeek-V4-Flash-MXFP4-00001-of-00002.gguf",
    "size": 5250016,
    "sha256": "aa52d7c0ba08350780e05d74f98f2e67be03dd6862f5878545d754ed56557dae",
    "url": "https://huggingface.co/ggml-org/DeepSeek-V4-Flash-GGUF/resolve/main/DeepSeek-V4-Flash-MXFP4-00001-of-00002.gguf"
   },
   {
    "file": "DeepSeek-V4-Flash-MXFP4-00002-of-00002.gguf",
    "size": 154986288576,
    "sha256": "e541dcb8f2595553512d625d112fa00e376377173f49b8ac075de46179727a6b",
    "url": "https://huggingface.co/ggml-org/DeepSeek-V4-Flash-GGUF/resolve/main/DeepSeek-V4-Flash-MXFP4-00002-of-00002.gguf"
   }
  ]
 },
 "glm-5.3-flash": {
  "name": "GLM-5.3 Flash",
  "maker": "Z.ai",
  "params": 320,
  "thinks": true,
  "file": "GLM-5.3-Flash-UD-Q4_K_XL-00001-of-00006.gguf",
  "size": 199707321472,
  "sha256": "b59c030090f012b38213bc8c4f78ce10767f2693d730d0dbcd3dc16a5f69e2bc",
  "url": "https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-Flash-UD-Q4_K_XL-00001-of-00006.gguf",
  "page": "https://huggingface.co/zai-org/GLM-5.3-Flash",
  "licence": "MIT",
  "licenceUrl": "https://opensource.org/license/mit",
  "why": "Z.ai's GLM-5.3 Flash (August 2026), under MIT: 320B parameters with 18B active (its card), the first natively multimodal GLM-5, and a memory of 1,048,576 tokens. Its card reports its coding and agent work in detail; its maker's tests used temperature 1.0 and top_p 0.95, which Ingenium uses. 199.7 GB in 6 parts (UD-Q4_K_XL), needing about 209.0 GB of memory: for a computer with 384 GB or more.",
  "large": true,
  "active": 18,
  "parts": [
   {
    "file": "GLM-5.3-Flash-UD-Q4_K_XL-00001-of-00006.gguf",
    "size": 9429984,
    "sha256": "b59c030090f012b38213bc8c4f78ce10767f2693d730d0dbcd3dc16a5f69e2bc",
    "url": "https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-Flash-UD-Q4_K_XL-00001-of-00006.gguf"
   },
   {
    "file": "GLM-5.3-Flash-UD-Q4_K_XL-00002-of-00006.gguf",
    "size": 49198039200,
    "sha256": "d3ecb6ff3957a99878f9a0352676a0913748a431a9a4a1b1ffa5ade9b8947a74",
    "url": "https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-Flash-UD-Q4_K_XL-00002-of-00006.gguf"
   },
   {
    "file": "GLM-5.3-Flash-UD-Q4_K_XL-00003-of-00006.gguf",
    "size": 49988626304,
    "sha256": "328073c004e7c5395b208247feed26089db247b94dd8fa4ab0f2569d86c1d770",
    "url": "https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-Flash-UD-Q4_K_XL-00003-of-00006.gguf"
   },
   {
    "file": "GLM-5.3-Flash-UD-Q4_K_XL-00004-of-00006.gguf",
    "size": 48700701344,
    "sha256": "6803ab7effa6da4a0b02c9c7865952fdd6c5b2e10e53903348da369e90bd13f9",
    "url": "https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-Flash-UD-Q4_K_XL-00004-of-00006.gguf"
   },
   {
    "file": "GLM-5.3-Flash-UD-Q4_K_XL-00005-of-00006.gguf",
    "size": 49026026752,
    "sha256": "852f3df9dacde3d196796f9fe738468e80c8701555ff0a8c30bc010fb8974dd8",
    "url": "https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-Flash-UD-Q4_K_XL-00005-of-00006.gguf"
   },
   {
    "file": "GLM-5.3-Flash-UD-Q4_K_XL-00006-of-00006.gguf",
    "size": 2784497888,
    "sha256": "c6ba510fafc1e12cc0addbc361a329c0c592ab96980098e7e25e107d8faa983e",
    "url": "https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-Flash-UD-Q4_K_XL-00006-of-00006.gguf"
   }
  ]
 },
 "qwen3.5-397b-a17b": {
  "name": "Qwen3.5 397B-A17B",
  "maker": "Qwen (Alibaba)",
  "params": 397,
  "thinks": true,
  "file": "Qwen3.5-397B-A17B-UD-Q4_K_XL-00001-of-00006.gguf",
  "size": 245272148448,
  "sha256": "63c290c9be83e1b4dd41833d81bd933afd535d65657579b9f92f5c3f76e0218d",
  "url": "https://huggingface.co/unsloth/Qwen3.5-397B-A17B-GGUF/resolve/main/UD-Q4_K_XL/Qwen3.5-397B-A17B-UD-Q4_K_XL-00001-of-00006.gguf",
  "page": "https://huggingface.co/Qwen/Qwen3.5-397B-A17B",
  "licence": "Apache 2.0",
  "licenceUrl": "https://www.apache.org/licenses/LICENSE-2.0",
  "why": "Qwen3.5's largest open model (February 2026), under Apache 2.0: 397B parameters, 17B at work on each word, a memory of 262,144 tokens, and it reads pictures. It thinks first by default; the Thinking key turns that off, and Ingenium uses its card's settings (thinking: temperature 0.6, top_p 0.95, top_k 20). 245.3 GB in 6 parts (UD-Q4_K_XL), needing about 256.5 GB of memory: for a computer with 384 GB or more.",
  "large": true,
  "active": 17,
  "parts": [
   {
    "file": "Qwen3.5-397B-A17B-UD-Q4_K_XL-00001-of-00006.gguf",
    "size": 10943552,
    "sha256": "63c290c9be83e1b4dd41833d81bd933afd535d65657579b9f92f5c3f76e0218d",
    "url": "https://huggingface.co/unsloth/Qwen3.5-397B-A17B-GGUF/resolve/main/UD-Q4_K_XL/Qwen3.5-397B-A17B-UD-Q4_K_XL-00001-of-00006.gguf"
   },
   {
    "file": "Qwen3.5-397B-A17B-UD-Q4_K_XL-00002-of-00006.gguf",
    "size": 49382486496,
    "sha256": "bb5c4cf617ece5726008fcd07f4b12e5e44297d7279f031d31bb8e1f8c9f8e87",
    "url": "https://huggingface.co/unsloth/Qwen3.5-397B-A17B-GGUF/resolve/main/UD-Q4_K_XL/Qwen3.5-397B-A17B-UD-Q4_K_XL-00002-of-00006.gguf"
   },
   {
    "file": "Qwen3.5-397B-A17B-UD-Q4_K_XL-00003-of-00006.gguf",
    "size": 49735103552,
    "sha256": "2952dadb60137f413d5f70f6ca3c06007e24198e712c882a094432f58f76c230",
    "url": "https://huggingface.co/unsloth/Qwen3.5-397B-A17B-GGUF/resolve/main/UD-Q4_K_XL/Qwen3.5-397B-A17B-UD-Q4_K_XL-00003-of-00006.gguf"
   },
   {
    "file": "Qwen3.5-397B-A17B-UD-Q4_K_XL-00004-of-00006.gguf",
    "size": 49365709504,
    "sha256": "5146f7db59fc6ba3eedf55e1f30259d4ed38b4caffdb1b694fe4de1ef272505f",
    "url": "https://huggingface.co/unsloth/Qwen3.5-397B-A17B-GGUF/resolve/main/UD-Q4_K_XL/Qwen3.5-397B-A17B-UD-Q4_K_XL-00004-of-00006.gguf"
   },
   {
    "file": "Qwen3.5-397B-A17B-UD-Q4_K_XL-00005-of-00006.gguf",
    "size": 49914377024,
    "sha256": "1401908545cd15bc68aae2bce8757b944bebdb14b13e5e3a721f09ba7f428205",
    "url": "https://huggingface.co/unsloth/Qwen3.5-397B-A17B-GGUF/resolve/main/UD-Q4_K_XL/Qwen3.5-397B-A17B-UD-Q4_K_XL-00005-of-00006.gguf"
   },
   {
    "file": "Qwen3.5-397B-A17B-UD-Q4_K_XL-00006-of-00006.gguf",
    "size": 46863528320,
    "sha256": "dde51f1fa49600ad9168a99fa6d72fcc3537a60df09972af07ffae94b0328edf",
    "url": "https://huggingface.co/unsloth/Qwen3.5-397B-A17B-GGUF/resolve/main/UD-Q4_K_XL/Qwen3.5-397B-A17B-UD-Q4_K_XL-00006-of-00006.gguf"
   }
  ],
  "vision": {
   "repos": [
    "unsloth/Qwen3.5-397B-A17B-GGUF"
   ],
   "prefer": [
    "mmproj-F16.gguf",
    "mmproj-BF16.gguf"
   ]
  }
 },
 "minimax-m3.1-flash": {
  "name": "MiniMax M3.1 Flash",
  "maker": "MiniMax",
  "params": 428,
  "thinks": true,
  "file": "MiniMax-M3.1-Flash-UD-Q4_K_XL-00001-of-00007.gguf",
  "size": 249402105310,
  "sha256": "33859402ee4d2e195ca0a2556310db7b8da0a14f6104917cd5203288f73f3030",
  "url": "https://huggingface.co/unsloth/MiniMax-M3.1-Flash-GGUF/resolve/main/UD-Q4_K_XL/MiniMax-M3.1-Flash-UD-Q4_K_XL-00001-of-00007.gguf",
  "page": "https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash",
  "licence": "Other: MiniMax's community licence (read it on its page)",
  "licenceUrl": "https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash/blob/main/LICENSE",
  "why": "MiniMax M3.1 Flash (October 2026): about 428B parameters with 23B active (its card) and a memory of up to 1M tokens, under MiniMax's community licence. Its maker recommends temperature 1.0 and top_p 0.95, which Ingenium uses. 249.4 GB in 7 parts (UD-Q4_K_XL), needing about 260.8 GB of memory: for a computer with 384 GB or more.",
  "large": true,
  "active": 23,
  "parts": [
   {
    "file": "MiniMax-M3.1-Flash-UD-Q4_K_XL-00001-of-00007.gguf",
    "size": 8243070,
    "sha256": "33859402ee4d2e195ca0a2556310db7b8da0a14f6104917cd5203288f73f3030",
    "url": "https://huggingface.co/unsloth/MiniMax-M3.1-Flash-GGUF/resolve/main/UD-Q4_K_XL/MiniMax-M3.1-Flash-UD-Q4_K_XL-00001-of-00007.gguf"
   },
   {
    "file": "MiniMax-M3.1-Flash-UD-Q4_K_XL-00002-of-00007.gguf",
    "size": 48922385120,
    "sha256": "bbd9f034daeeb857c2435da1153c6f3b9e11e28e0325a3048c428f26f53d0c00",
    "url": "https://huggingface.co/unsloth/MiniMax-M3.1-Flash-GGUF/resolve/main/UD-Q4_K_XL/MiniMax-M3.1-Flash-UD-Q4_K_XL-00002-of-00007.gguf"
   },
   {
    "file": "MiniMax-M3.1-Flash-UD-Q4_K_XL-00003-of-00007.gguf",
    "size": 48922385152,
    "sha256": "18cfd1957e6593af07e0c8045d1e37825bb6c1413ff50d99aea5a060ace537f4",
    "url": "https://huggingface.co/unsloth/MiniMax-M3.1-Flash-GGUF/resolve/main/UD-Q4_K_XL/MiniMax-M3.1-Flash-UD-Q4_K_XL-00003-of-00007.gguf"
   },
   {
    "file": "MiniMax-M3.1-Flash-UD-Q4_K_XL-00004-of-00007.gguf",
    "size": 48922385152,
    "sha256": "520e886b521cb0f77cfdcdc88e8934be0cd55de01209cad92667bf85cfdf595e",
    "url": "https://huggingface.co/unsloth/MiniMax-M3.1-Flash-GGUF/resolve/main/UD-Q4_K_XL/MiniMax-M3.1-Flash-UD-Q4_K_XL-00004-of-00007.gguf"
   },
   {
    "file": "MiniMax-M3.1-Flash-UD-Q4_K_XL-00005-of-00007.gguf",
    "size": 48922385152,
    "sha256": "c761ad19c980a67946a963faebd0175d5751cd64ccdec1bb6274810d3156013f",
    "url": "https://huggingface.co/unsloth/MiniMax-M3.1-Flash-GGUF/resolve/main/UD-Q4_K_XL/MiniMax-M3.1-Flash-UD-Q4_K_XL-00005-of-00007.gguf"
   },
   {
    "file": "MiniMax-M3.1-Flash-UD-Q4_K_XL-00006-of-00007.gguf",
    "size": 49985658336,
    "sha256": "367e01f928ed33c9d994b7fe22cb5e623b2bda9b67984b418f4367873c082436",
    "url": "https://huggingface.co/unsloth/MiniMax-M3.1-Flash-GGUF/resolve/main/UD-Q4_K_XL/MiniMax-M3.1-Flash-UD-Q4_K_XL-00006-of-00007.gguf"
   },
   {
    "file": "MiniMax-M3.1-Flash-UD-Q4_K_XL-00007-of-00007.gguf",
    "size": 3718663328,
    "sha256": "4d67d5144fb734820da7ba78aa58bfb0408dacfcf8601507b71e3e60310f74ef",
    "url": "https://huggingface.co/unsloth/MiniMax-M3.1-Flash-GGUF/resolve/main/UD-Q4_K_XL/MiniMax-M3.1-Flash-UD-Q4_K_XL-00007-of-00007.gguf"
   }
  ]
 },
 "glm-5.3": {
  "name": "GLM-5.3",
  "maker": "Z.ai",
  "params": 754,
  "thinks": true,
  "file": "GLM-5.3-UD-Q4_K_XL-00001-of-00011.gguf",
  "size": 467289116837,
  "sha256": "02a3e367e8b5f5ee3341d556211faa2cc956c3e77ad0e298c6805323bfaeb02d",
  "url": "https://huggingface.co/unsloth/GLM-5.3-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-UD-Q4_K_XL-00001-of-00011.gguf",
  "page": "https://huggingface.co/zai-org/GLM-5.3",
  "licence": "Other: Z.ai's GLM-5.3 licence (read it on its page)",
  "licenceUrl": "https://huggingface.co/zai-org/GLM-5.3/blob/main/LICENSE",
  "why": "Z.ai's largest GLM-5.3 (August 2026): about 754B parameters (its file's count) and a memory of 1,048,576 tokens, under Z.ai's own GLM-5.3 licence. Its card reports long coding and agent tasks run at its maximum reasoning effort; its maker's tests used temperature 1.0 and top_p 0.95, which Ingenium uses. 467.3 GB in 11 parts (UD-Q4_K_XL), needing about 488.1 GB of memory: for a computer with 768 GB or more.",
  "large": true,
  "parts": [
   {
    "file": "GLM-5.3-UD-Q4_K_XL-00001-of-00011.gguf",
    "size": 9428677,
    "sha256": "02a3e367e8b5f5ee3341d556211faa2cc956c3e77ad0e298c6805323bfaeb02d",
    "url": "https://huggingface.co/unsloth/GLM-5.3-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-UD-Q4_K_XL-00001-of-00011.gguf"
   },
   {
    "file": "GLM-5.3-UD-Q4_K_XL-00002-of-00011.gguf",
    "size": 49433942336,
    "sha256": "374daff9e093b362a12ca89904fd0511df38b2a9794029e272c8639587a13402",
    "url": "https://huggingface.co/unsloth/GLM-5.3-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-UD-Q4_K_XL-00002-of-00011.gguf"
   },
   {
    "file": "GLM-5.3-UD-Q4_K_XL-00003-of-00011.gguf",
    "size": 48566415136,
    "sha256": "9a13948a0c7747e374766ab32272e8bf5ee2ac260ed581419cc980c00df1bb9c",
    "url": "https://huggingface.co/unsloth/GLM-5.3-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-UD-Q4_K_XL-00003-of-00011.gguf"
   },
   {
    "file": "GLM-5.3-UD-Q4_K_XL-00004-of-00011.gguf",
    "size": 48566415136,
    "sha256": "1fee29db6ab247f97e42cc7dd4132ce35f15f41fb42ba9110b73c25471171f9b",
    "url": "https://huggingface.co/unsloth/GLM-5.3-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-UD-Q4_K_XL-00004-of-00011.gguf"
   },
   {
    "file": "GLM-5.3-UD-Q4_K_XL-00005-of-00011.gguf",
    "size": 48566415136,
    "sha256": "7d38557e09934a3f6cf4eb7aa7ea8c04929bf2d40db8ba8494529d51be04bb4e",
    "url": "https://huggingface.co/unsloth/GLM-5.3-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-UD-Q4_K_XL-00005-of-00011.gguf"
   },
   {
    "file": "GLM-5.3-UD-Q4_K_XL-00006-of-00011.gguf",
    "size": 48566415136,
    "sha256": "3f6c47e4e32f7b1f9b844124622cc8d506facdb58e3304b9b4429b6c3af4f53d",
    "url": "https://huggingface.co/unsloth/GLM-5.3-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-UD-Q4_K_XL-00006-of-00011.gguf"
   },
   {
    "file": "GLM-5.3-UD-Q4_K_XL-00007-of-00011.gguf",
    "size": 48566415136,
    "sha256": "03114618ca505e4dbd63e0c8fb478cb54db86ff32ddd3681160589d8a958db8e",
    "url": "https://huggingface.co/unsloth/GLM-5.3-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-UD-Q4_K_XL-00007-of-00011.gguf"
   },
   {
    "file": "GLM-5.3-UD-Q4_K_XL-00008-of-00011.gguf",
    "size": 48566415136,
    "sha256": "e202e8679571572ae5ab490d021e3f0d0ada4794521464e6735e62516bedff96",
    "url": "https://huggingface.co/unsloth/GLM-5.3-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-UD-Q4_K_XL-00008-of-00011.gguf"
   },
   {
    "file": "GLM-5.3-UD-Q4_K_XL-00009-of-00011.gguf",
    "size": 48566415136,
    "sha256": "05d81908bc8ffd1e2ff6bb6a4e7a347c455ce87d7d6c473415d37f1749f0a337",
    "url": "https://huggingface.co/unsloth/GLM-5.3-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-UD-Q4_K_XL-00009-of-00011.gguf"
   },
   {
    "file": "GLM-5.3-UD-Q4_K_XL-00010-of-00011.gguf",
    "size": 48566415136,
    "sha256": "252eac782187e63ffdbf0650eb79538a53626991f7dfd06106cfbbd5eb1a0bb3",
    "url": "https://huggingface.co/unsloth/GLM-5.3-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-UD-Q4_K_XL-00010-of-00011.gguf"
   },
   {
    "file": "GLM-5.3-UD-Q4_K_XL-00011-of-00011.gguf",
    "size": 29314424736,
    "sha256": "d69bc418b2a08103d1b42340e803e1a98582d3766e4593c4a490475ac5bb811b",
    "url": "https://huggingface.co/unsloth/GLM-5.3-GGUF/resolve/main/UD-Q4_K_XL/GLM-5.3-UD-Q4_K_XL-00011-of-00011.gguf"
   }
  ]
 },
 "qwen3.8-2.4t-a95b": {
  "name": "Qwen3.8 2.4T-A95B",
  "maker": "Qwen (Alibaba)",
  "params": 2446,
  "thinks": true,
  "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00001-of-00015.gguf",
  "size": 656565044416,
  "sha256": "b3e4b5504945603a85b93fdca708cfdc22163c47924fd7d4c168bf60c7b88478",
  "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00001-of-00015.gguf",
  "page": "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B",
  "licence": "Other: Qwen3.8 Max licence (read it on its page)",
  "licenceUrl": "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B/blob/main/LICENSE",
  "why": "Qwen3.8's open frontier model (August 2026): 2.4 trillion parameters with 95B active, and a memory of 262,144 tokens, under Qwen's own Qwen3.8 Max licence. Ingenium uses its card's settings (temperature 1.0, top_p 0.95, top_k 20). This copy is Unsloth's dynamic 2-bit (UD-IQ2_XXS): the only way a model this size fits a computer, and less exact than its own numbers. 656.6 GB in 15 parts (UD-IQ2_XXS), needing about 685.6 GB of memory: for a computer with 1 TB or more.",
  "large": true,
  "active": 95,
  "parts": [
   {
    "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00001-of-00015.gguf",
    "size": 10943296,
    "sha256": "b3e4b5504945603a85b93fdca708cfdc22163c47924fd7d4c168bf60c7b88478",
    "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00001-of-00015.gguf"
   },
   {
    "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00002-of-00015.gguf",
    "size": 49072948320,
    "sha256": "cd2cd3249599058790b034816e3c11009516010c8196b2f8be3cff97999bf5a0",
    "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00002-of-00015.gguf"
   },
   {
    "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00003-of-00015.gguf",
    "size": 49091300800,
    "sha256": "c2efdfe4c301a83ec20c917f066d6d7f2d5809c11df24b3c66285694dee176fb",
    "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00003-of-00015.gguf"
   },
   {
    "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00004-of-00015.gguf",
    "size": 49091300864,
    "sha256": "e792da1d0d1062347980e69de8c91832b8976216acf2c596a730882cbe8a7b0d",
    "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00004-of-00015.gguf"
   },
   {
    "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00005-of-00015.gguf",
    "size": 49210119552,
    "sha256": "d365ab6d2fb1266b477759314926eb675871fb36669ea48ee06ab99fc24716d6",
    "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00005-of-00015.gguf"
   },
   {
    "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00006-of-00015.gguf",
    "size": 49010558208,
    "sha256": "3f55f3f41ad710e6b258374d021d4480d30ced99835cc1372aa2d89fe05840b0",
    "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00006-of-00015.gguf"
   },
   {
    "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00007-of-00015.gguf",
    "size": 49091300864,
    "sha256": "70ea5e44c801e6cae45e8d0ce0ddb45efe0ef03cb7f9e2f6f206cf47acbb89f4",
    "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00007-of-00015.gguf"
   },
   {
    "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00008-of-00015.gguf",
    "size": 49091300864,
    "sha256": "d5e7cdbc768bb9ddc240c402cdd1d15c791276af049e9d155357f2a73a021dca",
    "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00008-of-00015.gguf"
   },
   {
    "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00009-of-00015.gguf",
    "size": 49210119552,
    "sha256": "5e1202f00c3c3926261aaabe5bf28f94a3df9c8d1dad8993d204896a27511e92",
    "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00009-of-00015.gguf"
   },
   {
    "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00010-of-00015.gguf",
    "size": 49010558208,
    "sha256": "767bf1915b5d9fd4d7c07ed242edb0500efb7c5ddce23c4913266edb17926b86",
    "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00010-of-00015.gguf"
   },
   {
    "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00011-of-00015.gguf",
    "size": 49091300864,
    "sha256": "47f573af25d4c8c6d60b72b77e7103153cbf1177df914653e44affd7d8bf72b2",
    "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00011-of-00015.gguf"
   },
   {
    "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00012-of-00015.gguf",
    "size": 49091300864,
    "sha256": "bcd1c34cb4696d757a12ab407934d8a5306197ef7339d12cd4069b35aba20d44",
    "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00012-of-00015.gguf"
   },
   {
    "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00013-of-00015.gguf",
    "size": 49210119552,
    "sha256": "805ad1cbca6b55aa3e98303898d1cd6f3ad6dd7305e3261432bf3a8a4a3ec7fe",
    "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00013-of-00015.gguf"
   },
   {
    "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00014-of-00015.gguf",
    "size": 49010558208,
    "sha256": "380692aed8ac5434e5bf125083a78af710dc5255814717fcda29ed68fe1bcd7f",
    "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00014-of-00015.gguf"
   },
   {
    "file": "Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00015-of-00015.gguf",
    "size": 18271314400,
    "sha256": "99d19e9f92bd6f63661c6b64c4900059b06683c682da82f96fbd8c1fcc3b43d9",
    "url": "https://huggingface.co/unsloth/Qwen3.8-2.4T-A95B-GGUF/resolve/main/UD-IQ2_XXS/Qwen3.8-2.4T-A95B-UD-IQ2_XXS-00015-of-00015.gguf"
   }
  ]
 },
 "deepseek-v4-pro": {
  "name": "DeepSeek V4 Pro",
  "maker": "DeepSeek",
  "params": 1573,
  "thinks": true,
  "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00001-of-00020.gguf",
  "size": 849683927055,
  "sha256": "0c6e411bf23282b5f149b3f0d7e0ae37f26bd23c6a3fbe52841437a4016736be",
  "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00001-of-00020.gguf",
  "page": "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813",
  "licence": "MIT",
  "licenceUrl": "https://opensource.org/license/mit",
  "why": "DeepSeek V4 Pro of 13 August 2026, under MIT: about 1.57 trillion parameters (its file's count) and a memory of 1,048,576 tokens. Its card sets reasoning effort to low, high or max, and recommends temperature 1.0 with top_p 1.0 outside agent work, which Ingenium uses. This copy is Unsloth's dynamic 4-bit (UD-Q4_K_XL). 849.7 GB in 20 parts (UD-Q4_K_XL), needing about 887.0 GB of memory: for a computer with 1.5 TB or more.",
  "large": true,
  "parts": [
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00001-of-00020.gguf",
    "size": 5257647,
    "sha256": "0c6e411bf23282b5f149b3f0d7e0ae37f26bd23c6a3fbe52841437a4016736be",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00001-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00002-of-00020.gguf",
    "size": 48499332992,
    "sha256": "aeb64ef378a3632ef938a32995b744e4935bcb2a73a6f4d4ac5a1dd8ed6fb467",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00002-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00003-of-00020.gguf",
    "size": 46206696672,
    "sha256": "440d5d735679f120baac875242c1a353cc37b87ecc41502052609c2bc90e725d",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00003-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00004-of-00020.gguf",
    "size": 46551168480,
    "sha256": "140fb3dc53d6bd908799044c8e83a71fa72b092c0232648837ab99bfbd60b6a8",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00004-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00005-of-00020.gguf",
    "size": 46211371104,
    "sha256": "82a295f7d1e5198cf004ac2ed2251a3f1eab76a99f1c17cebae3b5a2020d373e",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00005-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00006-of-00020.gguf",
    "size": 46206696768,
    "sha256": "f4ae46e760ad3b73ed2f99c8cf1f7e1f45d9013609ac7e8e5d8d040a6dec7f98",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00006-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00007-of-00020.gguf",
    "size": 46551168576,
    "sha256": "9bd015cbe215ae720f6e4a1708924da10fbc55bff5c9039b044f815abcf9aa77",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00007-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00008-of-00020.gguf",
    "size": 46211371104,
    "sha256": "f4534f1618f970b21e0585155c6fe3b432be3a54c604edb4bafff8198a161475",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00008-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00009-of-00020.gguf",
    "size": 46206696768,
    "sha256": "88a0868c24cff08ddb236fd10bba28916604a214d40a9d5c3038bfc61cf3fe21",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00009-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00010-of-00020.gguf",
    "size": 46551168576,
    "sha256": "ea34c36b38d90fe53d323e76f720ca8de8bd5c9e67ca4490499653b65ffe37fc",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00010-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00011-of-00020.gguf",
    "size": 46211371104,
    "sha256": "31eea9aebe4dd925cabad9a323813f164bc4728f653fadb7529c3ae350efda0b",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00011-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00012-of-00020.gguf",
    "size": 46206696768,
    "sha256": "d2cd296b4722733671669b0647d0b034353392fe62cfde819e3fc694cbf683d7",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00012-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00013-of-00020.gguf",
    "size": 46551168576,
    "sha256": "dd0f7c98b34f1a873ad61c22e0c78f8b85da56b2e2fe6a92016cfc5587bbf317",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00013-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00014-of-00020.gguf",
    "size": 46211371104,
    "sha256": "9a530b4ceb6231b5fe9a52f9cfd89caece00244089f94125c1081e41be134253",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00014-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00015-of-00020.gguf",
    "size": 46206696768,
    "sha256": "4983ff25d96c5bc89b111ac6560bef3cdbc6823c19ae3b48a2beef0e0fb90e39",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00015-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00016-of-00020.gguf",
    "size": 46551168576,
    "sha256": "b466c173037d16dd6e8bdd66cdcd5f0fefa22fa19d73b09a8271340ff8da0274",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00016-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00017-of-00020.gguf",
    "size": 46211371104,
    "sha256": "a3d408224bae3102de30d66c06efcf4f2ad1d9e6cf7c0f96e8f923e46b581d49",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00017-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00018-of-00020.gguf",
    "size": 46206696768,
    "sha256": "e8d837147dfc345a56de32f70575d5db708350894dac344a94adc85e4839f291",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00018-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00019-of-00020.gguf",
    "size": 46551168576,
    "sha256": "bd14f611c85332e42ab737167aefa0034f757b4e5c163fe4134395a585633661",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00019-of-00020.gguf"
   },
   {
    "file": "DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00020-of-00020.gguf",
    "size": 13575289024,
    "sha256": "5978999836fd1fe7ad7da6232a70981bd7f98274ed71d3b06652ba42c7b46031",
    "url": "https://huggingface.co/unsloth/DeepSeek-V4-Pro-0813-GGUF/resolve/main/UD-Q4_K_XL/DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00020-of-00020.gguf"
   }
  ]
 },
 "kimi-k3": {
  "name": "Kimi K3 · Compact",
  "maker": "Moonshot AI",
  "params": 2779,
  "thinks": true,
  "file": "Kimi-K3-UD-Q2_K_XL-00001-of-00019.gguf",
  "size": 861277858912,
  "sha256": "9f8f3fe081edcde262e1931f772b1edf1a486c4fc9d936e4028ea0cf5e7e10f9",
  "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00001-of-00019.gguf",
  "page": "https://huggingface.co/moonshotai/Kimi-K3",
  "licence": "Other: the Kimi K3 licence (read it on its page)",
  "licenceUrl": "https://huggingface.co/moonshotai/Kimi-K3/blob/main/LICENSE",
  "why": "Moonshot AI's Kimi K3 (July 2026): about 2.78 trillion parameters (its file's count) and a memory of 1,048,576 tokens, released as open frontier weights under the Kimi K3 licence. Its card's sampling settings were not read, so Ingenium uses its own. This is the compact copy, Unsloth's dynamic 2-bit (UD-Q2_K_XL). 861.3 GB in 19 parts (UD-Q2_K_XL), needing about 899.1 GB of memory: for a computer with 1.5 TB or more.",
  "large": true,
  "parts": [
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00001-of-00019.gguf",
    "size": 6934144,
    "sha256": "9f8f3fe081edcde262e1931f772b1edf1a486c4fc9d936e4028ea0cf5e7e10f9",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00001-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00002-of-00019.gguf",
    "size": 49949612160,
    "sha256": "1b75ae812eab18dc75ce6ffe1193fdd20101dfbcc0b7c31f337c69f8640b8234",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00002-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00003-of-00019.gguf",
    "size": 48978554752,
    "sha256": "4b673b76a775164d9c4e8a0d4a54b8fc5433095a7bb30b2f08d4f80ef661ca7c",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00003-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00004-of-00019.gguf",
    "size": 49824551744,
    "sha256": "74fad1ae8fa450978f8328cd7c6a7a095b498c6b2ed920933367b9b3d6eb70ad",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00004-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00005-of-00019.gguf",
    "size": 49393005856,
    "sha256": "5f9ac408d873a90c37a8d1fc32a35ca3b082453358f31ea65432612cb532acee",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00005-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00006-of-00019.gguf",
    "size": 47742644320,
    "sha256": "78d4d1a4fe6441cccf7e7aa1e2d090dfa55e77d977057c724b93fd4e3cb236c4",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00006-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00007-of-00019.gguf",
    "size": 49744198080,
    "sha256": "43f37ad972e0c416f1ebb1e5a4543bef183fe446b50c2da3b56c9c7eb978d21f",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00007-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00008-of-00019.gguf",
    "size": 47870271264,
    "sha256": "777c7db8ed7186260928c66d11d125751e76e94ddc0531c14ed02e5d0a72a717",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00008-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00009-of-00019.gguf",
    "size": 48999332128,
    "sha256": "2fb70ba9379b4ced216b6380f5ed77375170ca8245aa89c15c1e768a746f113e",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00009-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00010-of-00019.gguf",
    "size": 49165754528,
    "sha256": "093a516e45f674b47c2f2d3814b9b184ff3cb65cb3f914a19b9ca775f0e71fcf",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00010-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00011-of-00019.gguf",
    "size": 49843822496,
    "sha256": "e0f36720965581bddf426c8775e11859266fd3e8b5fead18b79168d01f94a873",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00011-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00012-of-00019.gguf",
    "size": 48999332128,
    "sha256": "3f8f5532945c4d90d26c881c34bf865b82342a5f41b89c5fda9e9d2727594691",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00012-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00013-of-00019.gguf",
    "size": 49997009440,
    "sha256": "57aa189ab9e930eccb19ed2fd2f2dc4fb893e01513096a7b0b12a7d9381908ef",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00013-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00014-of-00019.gguf",
    "size": 49012567584,
    "sha256": "8ba9f2e128209a0a6bc6f6b47f14b054785277944d423cd96d68cae15133ebfc",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00014-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00015-of-00019.gguf",
    "size": 49924176160,
    "sha256": "94a0330fa7f3fc733fc76e40ce6292f4eac46ccd4b01a936238ae8cb919f65b2",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00015-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00016-of-00019.gguf",
    "size": 49165754528,
    "sha256": "278da42223123e23879fe0d1c9c747d844c5e29bcfeb6d7a9dc3ba308518df6f",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00016-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00017-of-00019.gguf",
    "size": 49843822496,
    "sha256": "1a06ba622d5ef125635014d865a6a68ee8518fb81f7203db976aec3a23c27e84",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00017-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00018-of-00019.gguf",
    "size": 48999332128,
    "sha256": "cab554dbaa439a04dbb23f9b24a5059f90cf837e0ddb852abeac6d24285e9588",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00018-of-00019.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q2_K_XL-00019-of-00019.gguf",
    "size": 23817182976,
    "sha256": "0bbf968ab09e487d90dd3621e90c0463e756ac89fd349ddf60f3b5ac0c2c8e58",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q2_K_XL/Kimi-K3-UD-Q2_K_XL-00019-of-00019.gguf"
   }
  ]
 },
 "kimi-k3-best": {
  "name": "Kimi K3",
  "maker": "Moonshot AI",
  "params": 2779,
  "thinks": true,
  "file": "Kimi-K3-UD-Q4_K_XL-00001-of-00032.gguf",
  "size": 1508668683104,
  "sha256": "6a4946f4e60ebf19a3a8b0ac9f0fe7cd7f8c62936644b88c262c2fc01814ad87",
  "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00001-of-00032.gguf",
  "page": "https://huggingface.co/moonshotai/Kimi-K3",
  "licence": "Other: the Kimi K3 licence (read it on its page)",
  "licenceUrl": "https://huggingface.co/moonshotai/Kimi-K3/blob/main/LICENSE",
  "why": "Moonshot AI's Kimi K3 (July 2026): about 2.78 trillion parameters (its file's count) and a memory of 1,048,576 tokens, released as open frontier weights under the Kimi K3 licence. Its card's sampling settings were not read, so Ingenium uses its own. This copy is Unsloth's dynamic 4-bit (UD-Q4_K_XL). 1508.7 GB in 32 parts (UD-Q4_K_XL), needing about 1574.4 GB of memory: for a computer with 3 TB or more.",
  "large": true,
  "parts": [
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00001-of-00032.gguf",
    "size": 6934144,
    "sha256": "6a4946f4e60ebf19a3a8b0ac9f0fe7cd7f8c62936644b88c262c2fc01814ad87",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00001-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00002-of-00032.gguf",
    "size": 47478326816,
    "sha256": "93c68cee3c8d3f51d14d6df620adf49f59f5008a60edc0b5a5f3c02122914eee",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00002-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00003-of-00032.gguf",
    "size": 49151700032,
    "sha256": "d9836797469666bd4d9421fe74b1a338f5d2717c1f51d34ecd6e17f966a8717f",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00003-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00004-of-00032.gguf",
    "size": 49024073088,
    "sha256": "522a7f492fd7b3349748e21a83bc3e410afce08d363d5ee8e1256dac6c9bafaa",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00004-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00005-of-00032.gguf",
    "size": 49024073152,
    "sha256": "34c3a43a1e34cfd7f1ac5d1df7a2e34caf1d90f53e4cbe32e92dc58aba49cf0d",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00005-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00006-of-00032.gguf",
    "size": 49123697600,
    "sha256": "d3d7e01dd7943ee1ac0bec58d860bb8a6ffc5b1909d2c039185f92939253134f",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00006-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00007-of-00032.gguf",
    "size": 49151700096,
    "sha256": "a1c323be89cdd205db0a394d1ed13d4c9a39b3942db1597aabef261e0d57cc31",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00007-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00008-of-00032.gguf",
    "size": 49024073184,
    "sha256": "c27fcc5c0ac636d00c67d4b3bdd11f28a0ca881ca230f13bb79f8539b888cfc6",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00008-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00009-of-00032.gguf",
    "size": 49024073184,
    "sha256": "ee5fedd3a8fedfc297a1a69a569e92a748ccd0aae8c3786d915ccab3f1934945",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00009-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00010-of-00032.gguf",
    "size": 49123697600,
    "sha256": "152cc7caedc234590226aeef0795f367c5effd1aa55e3e69ef42ee4cecb5ff55",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00010-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00011-of-00032.gguf",
    "size": 49151700096,
    "sha256": "c90213c98a1ac7e4123bfa5d1e5d8e2ea66c4b3d8c2f138ab92bfeb246e55f3a",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00011-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00012-of-00032.gguf",
    "size": 49024073184,
    "sha256": "ba8f1cd3261ea19f50903fd38577cb646306066040e4bff42a9dd09d3c311e55",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00012-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00013-of-00032.gguf",
    "size": 49024073184,
    "sha256": "88d4e2eb281384a59f48a255b9890d7fa4012dc04530af2891c8447164bd3d3e",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00013-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00014-of-00032.gguf",
    "size": 49123697600,
    "sha256": "30930389f1fec4d8f70ee320cb27078466d3b627d78a305fa080b198253b41b0",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00014-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00015-of-00032.gguf",
    "size": 49151700096,
    "sha256": "039751297711e0fc95e2cc785971228ff597c6e1f612d19bcd6ca6308235d150",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00015-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00016-of-00032.gguf",
    "size": 49024073184,
    "sha256": "966fa6b7c2ceaaa401121fcb570d034ea4d410bca4b17375407dd9dac108bd55",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00016-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00017-of-00032.gguf",
    "size": 49024073184,
    "sha256": "e9e621aa949a413c85cb22709556d008dc960e0c0cce585d30e43ad823d85a42",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00017-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00018-of-00032.gguf",
    "size": 49123697600,
    "sha256": "2746c2b05913452b111eec78906fc01c784da4dbaf6865c4a6498a0f339bb44f",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00018-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00019-of-00032.gguf",
    "size": 49151700096,
    "sha256": "bc602590f2e67db761376dff5b88783107f7774d2033e1dd81a49abc25770dfe",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00019-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00020-of-00032.gguf",
    "size": 49024073184,
    "sha256": "ce430bc61d5261a0906c9e2a0820adb91a35cbf27be8e67ae29537540d13b38d",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00020-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00021-of-00032.gguf",
    "size": 49024073184,
    "sha256": "ebb418732d405083d31e8a585c26367d9465932107edbc2b162661d8bbef7cd4",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00021-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00022-of-00032.gguf",
    "size": 49123697600,
    "sha256": "5cfae619e1fce23b1a89406efe375f22f53e8112ea85a651f45a989228721ba0",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00022-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00023-of-00032.gguf",
    "size": 49151700096,
    "sha256": "d67e0c96fdce01987b2b4dc1b6a7437d370eb92b96d00b3b337cf1d7bdbb764a",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00023-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00024-of-00032.gguf",
    "size": 49024073184,
    "sha256": "651454705003b796580be7496c58517ca8c67ffe7f89b2e5c670adefa6ed0ae9",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00024-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00025-of-00032.gguf",
    "size": 49024073184,
    "sha256": "b0614df9c578d29eb84e9e9b2b1d2d8d7039d978fa8da3628047cebb82176927",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00025-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00026-of-00032.gguf",
    "size": 49123697600,
    "sha256": "1eabeef1b03ef0ae7d7438534cdf50a24d3f51f1d59d96d918ec50a89f55f2f8",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00026-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00027-of-00032.gguf",
    "size": 49151700096,
    "sha256": "1dc47678bca47f7f311b48a95438abbdbdfca32e1e476c5f95f94992d1c87609",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00027-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00028-of-00032.gguf",
    "size": 49024073184,
    "sha256": "bfd379217d74ffd292d8bce785d5a49991a0083bbf5aee3d6bba7590ae9e8f1d",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00028-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00029-of-00032.gguf",
    "size": 49024073184,
    "sha256": "e54a4ca96fa4900894840cb85c86a38230c943e16115323baf5fff677ef99cd6",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00029-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00030-of-00032.gguf",
    "size": 49123697600,
    "sha256": "6281d5615afd89552ab29c99fe8d44932d85946ca2bcb6c597a381a60ef5f92e",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00030-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00031-of-00032.gguf",
    "size": 49151700096,
    "sha256": "e49e398bd13f181a7a1af8f5abe3205d5f9c2ceb84397d18a22d02f7b6c33693",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00031-of-00032.gguf"
   },
   {
    "file": "Kimi-K3-UD-Q4_K_XL-00032-of-00032.gguf",
    "size": 37766913792,
    "sha256": "cbc67de27f82765a99b79869ca6e0d832add1ec3065d197f3c0f6a4cbd5b8ea8",
    "url": "https://huggingface.co/unsloth/Kimi-K3-GGUF/resolve/main/UD-Q4_K_XL/Kimi-K3-UD-Q4_K_XL-00032-of-00032.gguf"
   }
  ]
 }
};
Object.keys(LARGE).forEach(function(k){if(!M[k])M[k]=LARGE[k];});

/* ---------- 2. the houses on computers: the larger models first, then the lists that were there ---------- */
var MAG=["kimi-k3-best","deepseek-v4-pro","kimi-k3","glm-5.3","qwen3.8-2.4t-a95b","minimax-m3.1-flash","qwen3.5-397b-a17b","deepseek-v4-flash",
  "qwen3.8-flash-next","qwen3.5-122b-a10b","qwen3.5-122b-a10b-compact","nemotron-3.5-bolt-74b-a9b"];
var SCR=["qwen3.8-flash-next","gpt-oss-120b","qwen3-next-80b-a3b-thinking"];
var FAB=["glm-5.3","glm-5.3-flash","glm-5.3-flash-compact","qwen3-coder-next"];
function lead(list,before){var rest=[].concat(before||[]).filter(function(k){return list.indexOf(k)<0;});return list.filter(function(k){return !!M[k];}).concat(rest);}
["desktop","mac-arm"].forEach(function(dv){var t=D[dv]&&D[dv].tiers;if(!t)return;
  t.magister=lead(MAG,t.magister);t.scriba=lead(SCR,t.scriba);t.faber=lead(FAB,t.faber);});
/* a computer whose engine runs on its processor alone: only the mixture-of-experts models with few parameters at work on each word */
if(D.desktop&&D.desktop.cpuOnly){var C=D.desktop.cpuOnly;
  C.scriba=lead(["qwen3.8-flash-next","gpt-oss-120b","qwen3-next-80b-a3b-thinking"],C.scriba);
  C.magister=lead(["qwen3.5-397b-a17b","qwen3.8-flash-next","qwen3.5-122b-a10b","gpt-oss-120b","qwen3.5-122b-a10b-compact"],C.magister);
  C.faber=lead(["glm-5.3-flash","glm-5.3-flash-compact","qwen3-coder-next"],C.faber);}

/* ---------- 3. sampling: the settings each card gives ---------- */
ING_SAMPLING["qwen3-coder-next"]={temperature:1.0,top_p:0.95,top_k:40};
ING_SAMPLING["qwen3.5-397b"]={think:{temperature:0.6,top_p:0.95,top_k:20,min_p:0,presence_penalty:0,repeat_penalty:1},
  plain:{temperature:0.7,top_p:0.8,top_k:20,min_p:0,presence_penalty:1.5,repeat_penalty:1}};
ING_SAMPLING["glm-5"]={temperature:1.0,top_p:0.95};
ING_SAMPLING["minimax-m3"]={temperature:1.0,top_p:0.95};
ING_SAMPLING["deepseek-v4"]={temperature:1.0,top_p:1.0};
ING_SAMPLING["nemotron-3.5-bolt"]={temperature:1.0,top_p:0.95};
(function families(){var sf=samplingFamily;
  samplingFamily=function(m){if(!m)return null;
    var key=(typeof lineupKeyOfRec==="function"&&lineupKeyOfRec(m))||"";
    var txt=(key+" "+(m.fileName||"")+" "+(m.customName||"")+" "+((m.meta&&(m.meta.name||m.meta.basename))||"")).toLowerCase();
    if(/qwen3-coder-next/.test(txt))return "qwen3-coder-next";
    if(/qwen3\.5-397b/.test(txt))return "qwen3.5-397b";
    if(/glm-5/.test(txt))return "glm-5";
    if(/minimax-m3/.test(txt))return "minimax-m3";
    if(/deepseek-v4/.test(txt))return "deepseek-v4";
    if(/nemotron-3\.5-bolt/.test(txt))return "nemotron-3.5-bolt";
    return sf.apply(this,arguments);};
  window.samplingFamily=samplingFamily;})();

/* ---------- 4. an install names every part (the computer app checks each: desktop/app_parts_6102.py) ---------- */
(function parts(){var la=lineupArgs;
  lineupArgs=function(key){var a=la.apply(this,arguments),sp=M[key];
    if(a&&sp&&sp.parts)a.parts=sp.parts.map(function(p){return {file:p.file,size:p.size,sha256:p.sha256,url:p.url};});
    return a;};
  window.lineupArgs=lineupArgs;})();

/* ---------- 5. the Models page says there is no ceiling ---------- */
function note(){var d=lineupDevice();if(d!=="desktop"&&d!=="mac-arm"&&d!=="web")return;
  var card=document.getElementById("lineupCard"),n=document.getElementById("lineupNote");if(!card||!n||card.querySelector(".lu-large"))return;
  var p=document.createElement("p");p.className="lu-large";
  p.innerHTML="<b>No ceiling on memory.</b> On a computer with more memory, each house moves up to a larger model: from 96 GB to several terabytes, up to Kimi K3, DeepSeek V4 Pro and GLM-5.3. A model over 50 GB comes in parts, each checked against its fingerprint. Each house's list shows them all, with what each needs.";
  n.parentNode.insertBefore(p,n.nextSibling);}
(function hook(){var o=renderLineup;
  renderLineup=function(){var r=o.apply(this,arguments);try{note();}catch(e){}return r;};
  window.renderLineup=renderLineup;})();

window.IngR210={keys:Object.keys(LARGE),magister:MAG.slice(),scriba:SCR.slice(),faber:FAB.slice()};
})();
;try{window.__ingParts["p210"]="running";}catch(_){}
</script>
