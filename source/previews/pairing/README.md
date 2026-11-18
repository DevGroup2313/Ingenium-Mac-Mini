# Sealed between your devices (a live preview, waiting for her word)

https://claude.ai/artifact/KRuQqSihghbSgFcHswJCEU (18 November 2026), for Ingenium 7.37.

Her answer (18 November 2026), asked whether messages between her devices should be encrypted end to end: "Yes, encrypt them".
The preview shows the lending computer's Your devices card (r274's look, r271's values) beside the iPhone's screen: the code typed
once; then both screens show the same four words, and she confirms on the computer that they match; then the device is paired,
sealed end to end. A device paired before 7.37 is marked Pair once more.

Why the words: the pairing code has 40 bits (8 of 32 letters). That is enough against guessing over the network (wrong tries are
slowed), but too little to be the only secret behind the encryption, since a recorded pairing could be tried offline. Comparing words
proves that no one in between swapped the devices' keys (ECDH P-256 in the page; AES-GCM for every message).

Still to verify before building: whether the iPhone and iPad app's page (ingenium://app/, a custom scheme) is a secure context, so that
crypto.subtle exists there.
