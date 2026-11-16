/* Opening-hours status for every [data-status] element.
   Workshop hours: Monday – Saturday, 9:00 am – 6:00 pm, India time (Asia/Kolkata).
   Without JS the element keeps its static hours text. */
(function () {
  var els = document.querySelectorAll("[data-status]");
  if (!els.length || !window.Intl) return;
  var parts;
  try {
    parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date());
  } catch (e) { return; }
  var get = function (t) { for (var i = 0; i < parts.length; i++) if (parts[i].type === t) return parts[i].value; };
  var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  var mins = parseInt(get("hour"), 10) % 24 * 60 + parseInt(get("minute"), 10);
  if (day < 0 || isNaN(mins)) return;

  var workday = day >= 1 && day <= 6;
  var open = workday && mins >= 540 && mins < 1080;
  var text;
  if (open) text = "Open now, until 6 pm";
  else if (workday && mins < 540) text = "Closed — opens today 9 am";
  else if (day >= 1 && day <= 5) text = "Closed — opens tomorrow 9 am";
  else text = "Closed — opens Monday 9 am";

  els.forEach(function (el) {
    el.classList.add(open ? "is-open" : "is-closed");
    var label = el.querySelector("[data-status-text]") || el;
    label.textContent = text;
    el.setAttribute("title", "Monday – Saturday, 9:00 am – 6:00 pm");
  });
})();
