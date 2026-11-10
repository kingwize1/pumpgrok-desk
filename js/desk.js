/* PumpGrok Desk
   Paper-floor display. No network calls, no wallet, no signing, no orders.
*/
(function () {
  var views = ["floor", "risk", "seats", "book", "leads", "journal"];
  var titles = {
    floor: "Floor",
    risk: "Risk",
    seats: "Seats",
    book: "Book",
    leads: "Leads",
    journal: "Journal",
  };
  var buttons = Array.prototype.slice.call(
    document.querySelectorAll("[data-view-target]")
  );
  var panels = Array.prototype.slice.call(document.querySelectorAll("[data-view]"));
  var notice = document.getElementById("notice");
  var clock = document.getElementById("clock");
  var paperBtn = document.getElementById("mode-paper");
  var liveBtn = document.getElementById("mode-live");

  function say(text) {
    notice.textContent = "";
    window.setTimeout(function () {
      notice.textContent = text;
    }, 30);
  }

  function show(name) {
    if (views.indexOf(name) === -1) name = "floor";
    panels.forEach(function (panel) {
      panel.classList.toggle("is-active", panel.getAttribute("data-view") === name);
    });
    buttons.forEach(function (button) {
      var on = button.getAttribute("data-view-target") === name;
      button.classList.toggle("is-current", on);
      if (on) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    document.title = titles[name] + " · PumpGrok Desk";
    if (location.hash !== "#" + name) {
      history.replaceState(null, "", "#" + name);
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      show(button.getAttribute("data-view-target"));
    });
  });

  window.addEventListener("hashchange", function () {
    show(location.hash.replace(/^#/, ""));
  });

  paperBtn.addEventListener("click", function () {
    say("Paper is the active engagement. This desk simulates attention only and sends nothing.");
  });

  liveBtn.addEventListener("click", function () {
    say("Live is unavailable. This desk stays on paper and has no path to sign or send a transaction.");
  });

  function tick() {
    var now = new Date();
    var stamp = now.toISOString();
    clock.textContent = stamp.slice(11, 19);
    clock.setAttribute("datetime", stamp);
  }

  tick();
  window.setInterval(tick, 1000);

  document.addEventListener("keydown", function (event) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    var index = "123456".indexOf(event.key);
    if (index === -1) return;
    var tag = event.target && event.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    show(views[index]);
  });

  var initial = location.hash.replace(/^#/, "");
  show(views.indexOf(initial) === -1 ? "floor" : initial);
})();
