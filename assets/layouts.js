/* ==========================================================================
   Layout registry + "Back to all layouts" bar.
   Every layout page loads this file; the gallery and compare pages read
   window.LAYOUTS from it. Add or rename layouts here only.
   ========================================================================== */

(function () {
  var LAYOUTS = [
    { n: "00", name: "Original Homepage", round: 0, desc: "The first single-page draft: split hero, numbered services, gallery and dark contact band." },
    { n: "01", name: "Image-Led", round: 1, desc: "Full-bleed photo hero with the headline on top and a compact five-item services strip." },
    { n: "02", name: "Portfolio-First", round: 1, desc: "A one-line intro, then straight into a mosaic of completed vehicles." },
    { n: "03", name: "Editorial", round: 1, desc: "Serif, magazine-style page that tells the build in four stages." },
    { n: "04", name: "Practical", round: 1, desc: "A “What do you need?” router, vehicle-type cards and grouped services." },
    { n: "05", name: "Minimal", round: 1, desc: "Light type, wide margins, one hero photograph and very little else." },
    { n: "06", name: "Industrial", round: 1, desc: "Oversized condensed type, ruled panels and a yellow call band." },
    { n: "07", name: "Trust-Led", round: 1, desc: "Company statement beside a business-details card and a capabilities table." },
    { n: "08", name: "Industrial Flagship", round: 2, desc: "Cinematic workshop hero, capability grid, product line-up and a process timeline." },
    { n: "09", name: "Product Explorer", round: 2, desc: "A filterable catalogue of real builds, sorted by product category." },
    { n: "10", name: "Workshop Craftsmanship", round: 2, desc: "Seven fabrication stages told with close-up imagery and a sticky step index." },
    { n: "11", name: "Project Portfolio", round: 2, desc: "An asymmetric project mosaic as the hero, then categories and capabilities." },
    { n: "12", name: "Commercial Conversion", round: 2, desc: "For fleet owners: value proposition, quick WhatsApp enquiry, vehicle types and process." },
    { n: "13", name: "Local Trust", round: 2, desc: "Friendly regional layout led by location, phone, WhatsApp and real work." },
    { n: "14", name: "Precision Minimal", round: 2, desc: "Warm off-white canvas, large type, sharp crops and only the essentials." }
  ];
  window.LAYOUTS = LAYOUTS;

  // Resolve the site root from this script's own URL so links work on any
  // host path (e.g. a GitHub Pages project subfolder) and from file://.
  var script = document.currentScript;
  var root = script ? script.src.replace(/assets\/layouts\.js(\?.*)?$/, "") : "/";
  var isFile = location.protocol === "file:";
  function route(path) { return root + path + (isFile ? "index.html" : ""); }
  window.LAYOUT_ROUTE = function (n) { return route("layouts/" + n + "/"); };
  window.SITE_ROOT = route("");

  // When opened from disk, make folder links ("layouts/08/") open their index.html.
  function fixFileLinks() {
    if (!isFile) return;
    document.querySelectorAll("a[href$='/']").forEach(function (a) {
      var h = a.getAttribute("href");
      if (!/^[a-z]+:/i.test(h)) a.setAttribute("href", h + "index.html");
    });
  }

  function addBar() {
    var m = location.pathname.match(/layouts\/(\d\d)\//);
    if (!m || window.self !== window.top) return; // not a layout, or shown inside a preview frame
    var i = LAYOUTS.findIndex(function (l) { return l.n === m[1]; });
    if (i < 0) return;
    var cur = LAYOUTS[i];
    var prev = LAYOUTS[(i - 1 + LAYOUTS.length) % LAYOUTS.length];
    var next = LAYOUTS[(i + 1) % LAYOUTS.length];

    var style = document.createElement("style");
    style.textContent =
      ".lbar{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:2147483000;display:flex;align-items:center;gap:2px;" +
      "padding:5px;max-width:calc(100vw - 20px);background:#16181b;color:#fff;border-radius:999px;box-shadow:0 8px 28px rgba(0,0,0,.25);" +
      "font:500 13px/1 system-ui,-apple-system,'Segoe UI',sans-serif;animation:lbar-in .35s ease-out both}" +
      "@keyframes lbar-in{from{opacity:0;transform:translate(-50%,8px)}}" +
      "@media (prefers-reduced-motion:reduce){.lbar{animation:none}}" +
      ".lbar a{display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 14px;border-radius:999px;color:rgba(255,255,255,.82);text-decoration:none;white-space:nowrap}" +
      ".lbar a:hover{background:rgba(255,255,255,.12);color:#fff}" +
      ".lbar a:focus-visible{outline:2px solid #fff;outline-offset:2px}" +
      ".lbar .lbar-home{background:#fff;color:#16181b;font-weight:600}.lbar .lbar-home:hover{background:#e9e9e6;color:#16181b}" +
      ".lbar .lbar-cur{padding:0 10px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
      ".lbar .lbar-cur span{color:rgba(255,255,255,.5);margin-right:6px}" +
      ".lbar .lbar-step{width:36px;padding:0;justify-content:center;font-size:16px}" +
      "@media (max-width:520px){.lbar .lbar-cur b{display:none}.lbar a{padding:0 12px}}";
    document.head.appendChild(style);

    var bar = document.createElement("nav");
    bar.className = "lbar";
    bar.setAttribute("aria-label", "Layout navigation");
    bar.innerHTML =
      '<a class="lbar-home" href="' + window.SITE_ROOT + '">← <span class="t">All layouts</span><span class="sr" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)"> (gallery)</span></a>' +
      '<a class="lbar-step" href="' + window.LAYOUT_ROUTE(prev.n) + '" aria-label="Previous layout: ' + prev.n + ' ' + prev.name + '">‹</a>' +
      '<span class="lbar-cur"><span>' + cur.n + '</span><b>' + cur.name + '</b></span>' +
      '<a class="lbar-step" href="' + window.LAYOUT_ROUTE(next.n) + '" aria-label="Next layout: ' + next.n + ' ' + next.name + '">›</a>';
    document.body.appendChild(bar);

    var pb = parseFloat(getComputedStyle(document.body).paddingBottom) || 0;
    if (pb < 72) document.body.style.paddingBottom = "72px";
  }

  function init() { addBar(); fixFileLinks(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
