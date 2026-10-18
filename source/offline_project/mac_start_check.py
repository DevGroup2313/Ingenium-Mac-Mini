"""The Mac build recipe's first-start check, made to wait for an Intel start under Rosetta.

The recipe the Forge's and Carpe Diem's Mac kits carry (build-mac-app.yml, and its GITHUB_WORKFLOW_paste_this.txt copy)
opens the finished app as Apple silicon and as Intel, and asked the app's page server once, 12 seconds after each start.
Rosetta translates the app before its first Intel start, so that answer can come later: on 18 October 2026 The Forge 635
answered at 2 seconds as Apple silicon and at 16 as Intel, and the single question at 12 seconds failed the build of an
app that was working. The check now asks every 2 seconds for up to 40, and still fails the build if the page never
answers. Used by passes 636 of the Forge and 1055 of Carpe Diem.
usage (as a module): fix(text) -> (text, number of checks changed)"""
import re

OLD = re.compile(
    r'(?P<i> +)sleep 12\n'
    r'(?P=i)screencapture -x "\$RUNNER_TEMP/shots/mac-\$MODE-12s\.png" 2>/dev/null \|\| echo "no screenshot"\n'
    r'(?P=i)# the app serves its page from this Mac only; it must answer\n'
    r"(?P=i)CODE=\$\(curl -s -o /dev/null -w '%\{http_code\}' --max-time 10 (?P<url>http://127\.0\.0\.1:42001/\S+) \|\| true\)\n"
    r'(?P=i)echo "\$MODE: the app\'s page server answered \$CODE"\n'
    r'(?P=i)sleep 28\n')


def _new(m):
    i, url = m.group("i"), m.group("url")
    return "".join(i + l + "\n" for l in (
        "# the app serves its page from this Mac only; it must answer. Asked every 2 seconds for up to 40:",
        "# the first start as Intel runs through Rosetta, which translates the app before it runs, so it",
        "# can take longer than 12 seconds to begin serving, while a late answer is still a working app.",
        "CODE=000; T=0",
        "while [ $T -lt 40 ]; do",
        "  sleep 2; T=$((T+2))",
        "  CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 " + url + " || true)",
        '  if [ "$CODE" = "200" ]; then break; fi',
        "done",
        'echo "$MODE: the app\'s page server answered $CODE after $T seconds"',
        'screencapture -x "$RUNNER_TEMP/shots/mac-$MODE-first.png" 2>/dev/null || echo "no screenshot"',
        "if [ $T -lt 40 ]; then sleep $((40-T)); fi"))


def fix(text):
    return OLD.subn(_new, text)
