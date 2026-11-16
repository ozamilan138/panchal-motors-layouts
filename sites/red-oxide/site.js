/* Red Oxide site: small shared behaviours. Every page works without this
   file; it only adds the services preview, the work filters and the
   WhatsApp enquiry composer. Load with `defer`. */
(function () {
  // Home, services list: hovering or focusing a row swaps the preview photo
  // (crossfade in CSS).
  var rows = document.querySelectorAll(".svc a");
  var pics = document.querySelectorAll(".preview img");
  if (rows.length && pics.length) {
    var show = function (i) {
      rows.forEach(function (r, n) { r.classList.toggle("is-on", n === i); });
      pics.forEach(function (p, n) { p.classList.toggle("is-on", n === i); });
    };
    rows.forEach(function (r, n) {
      r.addEventListener("pointerenter", function () { show(n); });
      r.addEventListener("focus", function () { show(n); });
    });
    show(0);
  }

  // Our work: category filters. The buttons stay hidden without JS, when
  // every photo is shown. Tiles are re-laid as wide/narrow pairs that swap
  // sides each row, so the grid stays tidy whatever is filtered.
  var chips = document.querySelector(".chips");
  var grid = document.querySelector("#work-grid");
  if (chips && grid) {
    var btns = chips.querySelectorAll("button");
    var items = grid.querySelectorAll("figure");
    var out = document.getElementById("work-count");
    var layout = function () {
      var vis = [].filter.call(items, function (it) { return !it.hidden; });
      vis.forEach(function (it, i) {
        var row = Math.floor(i / 2), left = i % 2 === 0;
        var last = i === vis.length - 1 && left;
        it.classList.remove("w-wide", "w-narrow", "w-full");
        it.classList.add(last ? "w-full" : (row % 2 === 0) === left ? "w-wide" : "w-narrow");
      });
      return vis.length;
    };
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.getAttribute("data-filter");
        items.forEach(function (it) { it.hidden = !(f === "all" || it.getAttribute("data-cat") === f); });
        btns.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        var n = layout();
        out.textContent = f === "all"
          ? "Showing all " + n + " photos"
          : "Showing " + n + " of " + items.length + " photos: " + b.firstChild.textContent.trim();
      });
    });
    chips.hidden = false;
  }

  // Contact: the enquiry form composes a WhatsApp message. Without JS the
  // form still opens WhatsApp with the message field as the text.
  var form = document.querySelector("form[data-wa]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; };
      var lines = ["Hello Panchal Motors,"];
      if (val("f-need")) lines.push("I would like to ask about: " + val("f-need"));
      if (val("f-vehicle")) lines.push("Vehicle: " + val("f-vehicle"));
      if (val("f-msg")) lines.push("", val("f-msg"));
      lines.push("", "Name: " + val("f-name"));
      if (val("f-phone")) lines.push("Mobile: " + val("f-phone"));
      var url = form.getAttribute("action") + "?text=" + encodeURIComponent(lines.join("\n"));
      // ("noopener" would make window.open return null, so clear opener instead.)
      var win = window.open(url, "_blank");
      if (win) win.opener = null;
      else location.href = url;
    });
  }
})();
