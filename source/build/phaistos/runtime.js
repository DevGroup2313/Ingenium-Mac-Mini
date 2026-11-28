/* ============ PHAISTOS: its own name, pages, logo, Guide and courtyard, over the page it is made from (28 November 2026) ============
   Phaistos is made from Ingenium's Gift edition (nothing of the owner's in it) for her parents: "Phastos is the baby of Ingenium. It is a
   lighter and much more simplified and user-friendly version"; "I don't want any mention of Ingenium, this is an entirely new app with its
   own look and identity"; its pages: Chat and Code, Mentes and Concordia, the Guide and Settings. Every part here is kept in place as the
   page draws and redraws itself (a watcher on the page, never a timer that stops). */
(function (W) {
  "use strict";
  var D = W.document;
  var LOGO = /*PHX_LOGO*/null, WORD = /*PHX_WORD*/"", LEDE = /*PHX_LEDE*/"";
  var KEEP = { chat: 1, code: 1, models: 1, blend: 1, guide: 1, settings: 1 };
  var HIDE_CH = { "Home": 1, "Vesta": 1, "Your devices": 1, "Making things": 1, "Ingenia": 1, "Scholarship": 1, "The side buttons": 1 };
  /* its own words where the page it is made from speaks of a desk, an orb or the name it came with */
  var SAY = [[/\bPress your orb to enter\./g, "Choose your name to come in."], [/\bPress your orb\./g, "Choose your name."],
    [/\bopens your desk again\b/g, "opens Phaistos again"], [/\bopens your desk\b/g, "opens Phaistos"],
    [/Everything is sealed until its profile signs in again\./g, "Everything stays locked until its person signs in again."],
    [/Each profile opens as its owner chose\./g, "Each person's space opens as its owner chose."],
    [/\bIngenium\b/g, "Phaistos"], [/\bINGENIUM\b/g, "PHAISTOS"]];
  function say(v) { for (var i = 0; i < SAY.length; i++) v = v.replace(SAY[i][0], SAY[i][1]); return v; }
  var TEST = /Ingenium|INGENIUM|Press your orb|your desk|sealed until its profile|Each profile opens/;
  function skip(n) {
    for (var p = n.parentNode; p && p.nodeType === 1; p = p.parentNode) {
      var t = p.tagName; if (t === "SCRIPT" || t === "STYLE" || t === "TEXTAREA" || t === "svg" || t === "CODE" || t === "PRE") return true;
      if (p.classList && (p.classList.contains("msg") || p.classList.contains("cc-msg") || p.isContentEditable)) return true;  /* what people write stays theirs */
    }
    return false;
  }
  function fixText(n) { var v = n.nodeValue; if (v && TEST.test(v) && !skip(n)) { var w = say(v); if (w !== v) n.nodeValue = w; } }
  function rename(root) {
    if (!root) return;
    if (root.nodeType === 3) { fixText(root); return; }
    if (root.nodeType !== 1) return;
    var w = D.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n; while ((n = w.nextNode())) fixText(n);
    var els = root.querySelectorAll ? root.querySelectorAll("[title],[aria-label],[placeholder]") : [];
    [].forEach.call(els, function (e) { ["title", "aria-label", "placeholder"].forEach(function (a) { var v = e.getAttribute(a); if (v && TEST.test(v)) e.setAttribute(a, say(v)); }); });
  }
  function logo(host, size, cls) { var e = W.PHL.make(LOGO, { host: host, size: size || 0, cls: cls || "" }); e.classList.add("ph-lamp"); return e; }
  function brand() {
    var b = D.querySelector(".topbar .brand");
    if (b && !b.querySelector(".ph-brand")) {
      var s = D.createElement("span"); s.className = "ph-brand"; s.appendChild(logo(b, 0)); s.insertAdjacentHTML("beforeend", WORD); b.appendChild(s);
      b.title = "Phaistos"; b.setAttribute("aria-label", "Phaistos: open the welcome");
    }
    var seal = D.getElementById("introSeal");
    if (seal && !seal.querySelector(".ph-lamp")) { [].forEach.call(seal.children, function (c) { c.style.display = "none"; }); var l = logo(seal, 0); l.style.width = l.style.height = "100%"; seal.appendChild(l); }
  }
  /* ---------- the courtyard's head: the logo, the wordmark, the day and the words, kept in step with the sign-in's own ---------- */
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function today() { var d = new Date(); return DAYS[d.getDay()] + ", " + d.getDate() + " " + MONTHS[d.getMonth()]; }
  function court() {
    var st = D.getElementById("sioStage"); if (!st) return;
    var head = st.querySelector(".sio-head"); if (!head) return;
    var mk = head.querySelector(".phx-mark");
    if (!mk) {
      mk = D.createElement("div"); mk.className = "phx-mark";
      var key = logo(null, 96); key.setAttribute("role", "button"); key.setAttribute("tabindex", "0"); key.setAttribute("aria-label", "Phaistos. Press it for fun.");
      key.addEventListener("click", function () { try { var s = st.querySelector(".r175-seal"); if (s) s.click(); } catch (e) {} });
      mk.appendChild(key); mk.insertAdjacentHTML("beforeend", WORD.replace('class="ph-word"', 'class="phx-word"'));
      var dy = D.createElement("div"); dy.className = "phx-day"; var h = D.createElement("h1"); h.className = "phx-hello"; var p = D.createElement("p"); p.className = "phx-sub";
      head.insertBefore(mk, head.firstChild); head.appendChild(dy); head.appendChild(h); head.appendChild(p);
    }
    var set = function (sel, t) { var e = head.querySelector(sel); if (e && e.textContent !== t) e.textContent = t; };
    set(".phx-day", today());
    set(".phx-hello", say((head.querySelector(".sio-hello") || {}).textContent || ""));
    set(".phx-sub", say((head.querySelector(".sio-sub") || {}).textContent || ""));
  }
  function welcome() {
    var c = D.querySelector("#introDoor .intro-card"); if (!c) return;
    var l = c.querySelector(".intro-lede"); if (l && LEDE && l.textContent !== LEDE) l.textContent = LEDE;
  }
  function groups() {
    var dock = D.querySelector(".dock"); if (!dock) return;
    [].forEach.call(dock.querySelectorAll(".nav-btn[data-page]"), function (b) { var v = KEEP[b.getAttribute("data-page")] ? "" : "none"; if (b.style.display !== v) b.style.display = v; });
    [].forEach.call(dock.querySelectorAll(".grp-label"), function (l) { var t = l.textContent.trim(); if (t === "Studio") l.textContent = "Talk"; else if (t === "Learn") l.textContent = "Help"; });
    var m = dock.querySelector('.nav-btn[data-page="models"]');
    if (m && !dock.querySelector(".ph-minds")) { var lab = D.createElement("div"); lab.className = "grp-label ph-minds"; lab.textContent = "Minds"; m.parentNode.insertBefore(lab, m); }
    [].forEach.call(dock.querySelectorAll(".grp-label"), function (l) {
      var e = l.nextElementSibling, seen = false;
      while (e && !e.classList.contains("grp-label")) { if (e.style.display !== "none" && e.classList.contains("nav-btn") && e.getAttribute("data-page")) seen = true; e = e.nextElementSibling; }
      var v = seen ? "" : "none"; if (l.style.display !== v) l.style.display = v;
    });
    [].forEach.call(D.querySelectorAll(".rail-btn,#railChevron"), function (b) { if (b.style.display !== "none") b.style.display = "none"; });  /* no moon, no side keys */
  }
  function guide() {
    var g = D.getElementById("page-guide"); if (!g) return; var n = 0;
    [].forEach.call(g.querySelectorAll(".tour-entry-chap"), function (c) {
      var s = c.querySelectorAll("span"), name = s.length > 1 ? s[1].textContent.trim() : "";
      if (HIDE_CH[name]) { if (c.style.display !== "none") c.style.display = "none"; } else { n++; if (s[0] && s[0].textContent !== String(n)) s[0].textContent = String(n); }
    });
    var cnt = g.querySelector(".gt2-count"); if (cnt && n && cnt.textContent !== n + " chapters") cnt.textContent = n + " chapters";
    [].forEach.call(g.querySelectorAll(".rm-tab"), function (t) { if (/Making and study/.test(t.textContent)) t.style.display = "none"; });
  }
  var KT = 0;
  function keys() {
    var now = Date.now(); if (now - KT < 1200) return; KT = now;
    var acc = getComputedStyle(D.documentElement).getPropertyValue("--accent").trim(); if (!acc) return;
    var d = D.createElement("i"); d.style.color = acc; D.body.appendChild(d); var A = getComputedStyle(d).color; d.remove();
    [].forEach.call(D.querySelectorAll("button,[role=button],a.btn,.chip,.rm-tab,.rm-step"), function (e) {
      if (!e.offsetParent || e.classList.contains("ph-keyfix") || e.closest(".sio-orb,.phl,#sioStage")) return;
      var cs = getComputedStyle(e);
      if (cs.backgroundColor === A || (cs.backgroundImage || "").indexOf(A) >= 0 || cs.color === "rgb(255, 255, 255)") e.classList.add("ph-keyfix");
    });
  }
  function bar() {
    var d = D.getElementById("statusDot"); var pill = d && (d.closest("button") || d.parentElement);
    if (pill && /At the/.test(pill.textContent)) pill.style.display = "none";
    [].forEach.call(D.querySelectorAll(".topbar button"), function (x) { if (x.textContent.trim() === "›") x.style.display = "none"; });
  }
  function type() {
    [].forEach.call(D.querySelectorAll("h1,h2,h3,h4,.page-title,.sec,[class*=hello],[class*=greet],[class*=title]"), function (e) {
      if (e.__phx || e.closest("#sioStage")) return; e.__phx = 1;
      if (/Cormorant|Setup Serif|Iowan|Palatino|Georgia/i.test(getComputedStyle(e).fontFamily)) { e.style.fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,"Helvetica Neue",Arial,sans-serif'; e.style.fontWeight = "600"; e.style.letterSpacing = "-.01em"; }
    });
  }
  function all(q) {
    try { brand(); } catch (e) {} try { court(); } catch (e) {} try { welcome(); } catch (e) {} try { groups(); } catch (e) {}
    try { if (q) q.forEach(rename); else rename(D.body); } catch (e) {}
    try { guide(); } catch (e) {} try { keys(); } catch (e) {} try { bar(); } catch (e) {} try { type(); } catch (e) {}
    if (D.title !== "Phaistos") D.title = "Phaistos";
  }
  var Q = [], due = 0;
  function soon() { if (due) return; due = setTimeout(function () { due = 0; var q = Q; Q = []; all(q.length > 400 ? null : q); }, 120); }
  function start() {
    W.PHL.style(); all(null);
    try {
      new MutationObserver(function (ms) {
        for (var i = 0; i < ms.length; i++) { var m = ms[i]; if (m.type === "characterData") Q.push(m.target); else for (var j = 0; j < m.addedNodes.length; j++) Q.push(m.addedNodes[j]); }
        soon();
      }).observe(D.body, { childList: true, subtree: true, characterData: true });
    } catch (e) {}
    /* the sign-in's own words change without new nodes now and then (a greeting at a new hour): the head is read again each second */
    setInterval(function () { try { court(); } catch (e) {} }, 1000);
  }
  if (D.body) start(); else D.addEventListener("DOMContentLoaded", start);
  W.__phaistos = { all: function () { all(null); }, say: say };
})(window);
