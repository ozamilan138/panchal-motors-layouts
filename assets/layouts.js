/* ==========================================================================
   Layout registry + "Back to all layouts" bar.
   Every layout page loads this file; the gallery and compare pages read
   window.LAYOUTS from it. Add or rename layouts here only.
   ========================================================================== */

(function () {
  // hidden: kept on disk and reachable by URL, but left out of the gallery,
  // the compare page and the next/previous bar. 01 and 13 now live on as the
  // full websites below; their layout pages redirect there. 15 and 16 too.
  var LAYOUTS = [
    { n: "00", hidden: true, name: "Original Homepage", round: 0, desc: "The first single-page draft: split hero, numbered services, gallery and dark contact band." },
    { n: "01", hidden: true, name: "Image-Led", round: 1, desc: "Full-bleed photo hero with the headline on top and a compact five-item services strip." },
    { n: "02", hidden: true, name: "Portfolio-First", round: 1, desc: "A one-line intro, then straight into a mosaic of completed vehicles." },
    { n: "03", hidden: true, name: "Editorial", round: 1, desc: "Serif, magazine-style page that tells the build in four stages." },
    { n: "04", hidden: true, name: "Practical", round: 1, desc: "A “What do you need?” router, vehicle-type cards and grouped services." },
    { n: "05", hidden: true, name: "Minimal", round: 1, desc: "Light type, wide margins, one hero photograph and very little else." },
    { n: "06", hidden: true, name: "Industrial", round: 1, desc: "Oversized condensed type, ruled panels and a yellow call band." },
    { n: "07", hidden: true, name: "Trust-Led", round: 1, desc: "Company statement beside a business-details card and a capabilities table." },
    { n: "08", hidden: true, name: "Industrial Flagship", round: 2, desc: "Cinematic workshop hero, capability grid, product line-up and a process timeline." },
    { n: "09", hidden: true, name: "Product Explorer", round: 2, desc: "A filterable catalogue of real builds, sorted by product category." },
    { n: "10", hidden: true, name: "Workshop Craftsmanship", round: 2, desc: "Seven fabrication stages told with close-up imagery and a sticky step index." },
    { n: "11", hidden: true, name: "Project Portfolio", round: 2, desc: "An asymmetric project mosaic as the hero, then categories and capabilities." },
    { n: "12", hidden: true, name: "Commercial Conversion", round: 2, desc: "For fleet owners: value proposition, quick WhatsApp enquiry, vehicle types and process." },
    { n: "13", hidden: true, name: "Local Trust", round: 2, desc: "Friendly regional layout led by location, phone, WhatsApp and real work." },
    { n: "14", hidden: true, name: "Precision Minimal", round: 2, desc: "Warm off-white canvas, large type, sharp crops and only the essentials." },
    { n: "15", hidden: true, name: "Blueprint", round: 3, desc: "Led by a self-drawing engineering elevation of a truck body, with a vehicle picker, the build process and a WhatsApp enquiry form." },
    { n: "16", hidden: true, name: "Red Oxide", round: 3, desc: "Primer-red split screen: identity and contact stay fixed on the left while services and work scroll on the right." }
  ];
  window.LAYOUTS = LAYOUTS;
  window.VISIBLE_LAYOUTS = LAYOUTS.filter(function (l) { return !l.hidden; });

  // Full multi-page websites built from the selected layouts.
  var SITES = [
    { slug: "image-led", from: "01", name: "Image-Led", desc: "Photo-led pages with a full-bleed hero on every page, expanded Archivo headlines and a signal-orange accent." },
    { slug: "local-trust", from: "13", name: "Local Trust", desc: "A friendly local-workshop site led by phone, WhatsApp and location, with a live open-now status and a Gujarati name line." },
    { slug: "blueprint", from: "15", name: "Blueprint", desc: "Drawing-sheet blue with a self-drawing truck elevation, a vehicle picker, the build process and a WhatsApp enquiry form." },
    { slug: "red-oxide", from: "16", name: "Red Oxide", desc: "Primer-red split screen: identity, contact and navigation stay fixed on the left while each page scrolls on the right." }
  ];
  window.SITES = SITES;
  // Bump on each deploy so gallery previews never show a cached, older layout.
  window.LAYOUT_VERSION = "5";

  // Resolve the site root from this script's own URL so links work on any
  // host path (e.g. a GitHub Pages project subfolder) and from file://.
  var script = document.currentScript;
  var root = script ? script.src.replace(/assets\/layouts\.js(\?.*)?$/, "") : "/";
  var isFile = location.protocol === "file:";
  function route(path) { return root + path + (isFile ? "index.html" : ""); }
  window.LAYOUT_ROUTE = function (n) { return route("layouts/" + n + "/"); };
  window.SITE_ROOT = route("");
  window.SITE_ROUTE = function (slug) { return route("sites/" + slug + "/"); };

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
    // Step through the visible layouts; a hidden one opened by URL steps through all.
    var list = cur.hidden ? LAYOUTS : window.VISIBLE_LAYOUTS;
    i = list.indexOf(cur);
    var prev = list[(i - 1 + list.length) % list.length];
    var next = list[(i + 1) % list.length];

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

  // Slim "design preview" strip at the top of every page of a full site.
  function addSiteStrip() {
    var m = location.pathname.match(/sites\/([a-z-]+)\//);
    if (!m || window.self !== window.top) return;
    var site = SITES.filter(function (s) { return s.slug === m[1]; })[0];
    if (!site) return;
    var other = SITES[(SITES.indexOf(site) + 1) % SITES.length];
    var style = document.createElement("style");
    style.textContent =
      ".pstrip{position:relative;z-index:2147483000;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:7px 16px;" +
      "background:#16181b;color:rgba(255,255,255,.75);font:500 13px/1.3 system-ui,-apple-system,'Segoe UI',sans-serif}" +
      ".pstrip a{color:#fff;text-decoration:none;font-weight:600;white-space:nowrap}.pstrip a:hover{text-decoration:underline}" +
      ".pstrip a:focus-visible{outline:2px solid #fff;outline-offset:2px}.pstrip .ps-mid{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
      ".pstrip .ps-end{display:flex;gap:16px}@media (max-width:600px){.pstrip .ps-mid,.pstrip .ps-other{display:none}}";
    document.head.appendChild(style);
    var bar = document.createElement("div");
    bar.className = "pstrip";
    bar.setAttribute("role", "note");
    bar.innerHTML = '<a href="' + window.SITE_ROOT + '">← All layouts</a>' +
      '<span class="ps-mid">Design preview · ' + site.name + ' website (from layout ' + site.from + ')</span>' +
      '<span class="ps-end">' + (other !== site ? '<a class="ps-other" href="' + window.SITE_ROUTE(other.slug) + '">Next: ' + other.name + ' site →</a>' : '') + '</span>';
    // After the skip link, so "Skip to content" stays the first tab stop.
    var skip = document.querySelector("body > .skip");
    document.body.insertBefore(bar, skip ? skip.nextSibling : document.body.firstChild);
    // Pages with a header laid over the hero use this to sit below the strip.
    document.documentElement.style.setProperty("--pstrip", bar.offsetHeight + "px");
  }

  function init() { addBar(); addSiteStrip(); fixFileLinks(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
