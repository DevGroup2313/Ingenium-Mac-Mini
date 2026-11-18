# One setting for each model (a live preview, waiting for her word)

https://claude.ai/artifact/1Pi8wWFGkSGt71bAekYcUP (18 November 2026), for Ingenium 7.39.

Her words: the Tokens and Context controls reset to zero, are "out whack all over the app", and can be set only on the chat pages,
with no effort level elsewhere. Asked what to do (18 November 2026): "Both" (one setting everywhere, and a record that shows where a
reset comes from).
Found in the code (7.38): Lector, Vocatio and Folders use the model's own saved Reply and Memory (r233) and Effort (r225); Code's
sessions (r215) and Fabrica's working loop (r190) read Chat's sliders (ctlTokens, ctlEffort) instead, so one model could run with
different limits in different places.
The preview: the same small key beside the model in every place (Chat, Code, Lector, Vocatio, Fabrica), opening Reply, Memory and
Effort; a change in one place is the change everywhere; never zero (a lost value is mended to its last good one); a record of every
change, and of any reset caught, with the place that made it.
