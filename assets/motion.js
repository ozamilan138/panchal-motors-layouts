/* Scroll reveal: adds .is-in to each [data-reveal] element once, as it
   enters the viewport. Styles live in assets/base.css. Skipped entirely
   for reduced motion or browsers without IntersectionObserver, so content
   is always visible. Load with `defer`. */
(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;
  var els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -10% 0px" });
  // Anything already on screen at load is shown at once, without animating.
  var fold = window.innerHeight * 0.9;
  els.forEach(function (el) {
    if (el.getBoundingClientRect().top < fold) el.classList.add("is-in");
    else io.observe(el);
  });
  document.documentElement.classList.add("js-motion");
})();
