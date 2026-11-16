/* Panchal Motors — Blueprint site. Small shared behaviour, no libraries.
   Each block looks for its own markup and does nothing if it is absent.
   Without this script: the nav shows as a row, every vehicle panel and every
   photo stays visible, and the enquiry form still opens WhatsApp. */
(function () {
  // Marks JavaScript as running; CSS only folds the menu, tabs and filters away under .js.
  document.documentElement.classList.add("js");

  /* Menu button (phones and small tablets) */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setOpen(false); toggle.focus(); }
    });
  }

  /* Vehicle tabs (Home) */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  if (tabs.length) {
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab, panel = document.getElementById(t.getAttribute("aria-controls"));
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        if (on && panel.hidden) {
          panel.hidden = false;
          panel.classList.remove("is-entering");
          void panel.offsetWidth;
          panel.classList.add("is-entering");
        } else if (!on) { panel.hidden = true; }
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        else if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === "Home") n = tabs[0];
        else if (e.key === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    // Tab roles are added here so that without JS the panels read as plain sections.
    tabs.forEach(function (t) {
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", t.id);
      panel.tabIndex = 0;
    });
    var list = tabs[0].parentNode;
    list.hidden = false;
    tabs.forEach(function (t, i) { if (i) document.getElementById(t.getAttribute("aria-controls")).hidden = true; });
    var set = list.closest(".tabset");
    if (set) set.classList.add("is-ready");
  }

  /* WhatsApp enquiry: compose the message from the form fields */
  document.querySelectorAll("form[data-wa]").forEach(function (form) {
    form.addEventListener("submit", function () {
      // Fields carry data-field, not name, so only the composed text goes to wa.me.
      var val = function (name) { var el = form.querySelector('[data-field="' + name + '"]'); return el ? el.value.trim() : ""; };
      var msg = "Hello Panchal Motors, my name is " + val("name") + ". Vehicle: " + val("vehicle") + ". Work needed: " + val("work") + ".";
      if (val("details")) msg += " " + val("details").replace(/[.!?]?$/, ".");
      msg += " Please let me know the next step.";
      form.elements.text.value = msg;
    });
  });

  /* Our work: category filters */
  var filters = document.querySelectorAll("[data-filter]");
  var grid = document.getElementById("work-grid");
  var out = document.getElementById("filter-count");
  if (filters.length && grid) {
    var items = grid.querySelectorAll("figure");
    filters.forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.getAttribute("data-filter"), n = 0;
        items.forEach(function (it) {
          var on = f === "all" || it.getAttribute("data-cat") === f;
          it.hidden = !on;
          it.classList.remove("is-shown");
          if (on) { n++; void it.offsetWidth; it.classList.add("is-shown"); }
        });
        filters.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        if (out) out.textContent = f === "all" ? "Showing all " + n + " photos" : "Showing " + n + " of " + items.length + " photos: " + b.getAttribute("data-label");
      });
    });
  }
})();
