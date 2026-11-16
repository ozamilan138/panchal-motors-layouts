# Panchal Motors — homepage layout concepts

Static HTML/CSS design review site for Panchal Motors (vehicle body builders, GIDC, Deesa): four full five-page website designs to choose between. No build step.

Live: https://ozamilan138.github.io/panchal-motors-layouts/

## Run locally

```
python -m http.server 8000
```

Then open http://localhost:8000/. Opening `index.html` directly from disk also works.

## Routes

| Route | What |
|---|---|
| `/` | Gallery of the four websites, with a desktop/mobile preview switch |
| `/compare/` | The same designs live, side by side |
| `/credits/` | Source and licence of every photo |
| `/sites/image-led/` | Full website from layout 01: Home, Services, Our Work, About, Contact |
| `/sites/local-trust/` | Full website from layout 13: Home, Services, Our Work, About, Contact |
| `/sites/blueprint/` | Full website from layout 15: Home, Services, Our Work, About, Contact |
| `/sites/red-oxide/` | Full website from layout 16: Home, Services, Our Work, About, Contact |
| `/layouts/01/`, `/layouts/13/`, `/layouts/15/`, `/layouts/16/` | Redirect to the full websites built from them |
| `/layouts/00/` – `/layouts/14/` | Earlier concepts, hidden from the gallery but still reachable by URL |
| `/concepts/*.html` | Old addresses; redirect to the routes above |

## Structure

- `layouts/NN/index.html`: each layout is one self-contained page with its own inline styles.
- `assets/base.css`: shared reset, placeholder, focus, skip-link and scroll-reveal styles.
- `assets/motion.js`: tiny scroll-reveal script (no library). Add `data-reveal` to a block to fade it in once as it scrolls into view; skipped for visitors who prefer reduced motion.
- `assets/layouts.js`: the list of layouts (names, descriptions) and the "All layouts" bar shown at the bottom of every layout. Add or rename layouts here; `hidden: true` keeps a layout out of the gallery, compare page and bar.
- `assets/photos/`: CC0 stock photos (sources on `/credits/`). Replace them with real workshop photos, keeping the same file names or updating each `<img>` and its `alt` text.

## Full websites

Each site in `sites/<name>/` has one shared stylesheet (`site.css`), an optional `site.js`, and a folder per page. Forms either open WhatsApp with the message filled in or are marked design-only, and maps are illustrations with a Google Maps link. The dark strip at the top of each page comes from `assets/layouts.js`; remove that script tag when launching.

## Picking a design

Copy the chosen `sites/<name>/` folder to the site root, together with `assets/` (base.css, motion.js, favicon.svg and the photos it uses). Fix the `../../assets/` paths to match, and remove the `layouts.js` script tags.
