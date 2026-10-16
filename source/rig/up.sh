#!/bin/bash
# start the headless app back-end if it is not answering
curl -s -m 2 http://127.0.0.1:18999/ >/dev/null && exit 0
cd /tmp/claude-0/-home-user/d39fdd94-06f3-51ef-8895-bcbb5e212e6c/scratchpad/rig && HOME=/tmp/claude-0/-home-user/d39fdd94-06f3-51ef-8895-bcbb5e212e6c/scratchpad/rig/home XDG_DATA_HOME=/tmp/claude-0/-home-user/d39fdd94-06f3-51ef-8895-bcbb5e212e6c/scratchpad/rig/home/.local/share setsid nohup python3 run_app.py /tmp/claude-0/-home-user/d39fdd94-06f3-51ef-8895-bcbb5e212e6c/scratchpad/rig/app 18999 > /tmp/claude-0/-home-user/d39fdd94-06f3-51ef-8895-bcbb5e212e6c/scratchpad/rig/app.log 2>&1 < /dev/null &
for i in $(seq 1 30); do curl -s -m 2 http://127.0.0.1:18999/ >/dev/null && exit 0; sleep 0.5; done; echo "rig did not start"; exit 1
