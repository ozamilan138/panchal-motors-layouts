# Panchal Motors — homepage layout concepts

Static HTML/CSS design review site: 15 homepage layouts for Panchal Motors (vehicle body builders, GIDC, Deesa). No build step.

Live: https://ozamilan138.github.io/panchal-motors-layouts/

## Run locally

```
python -m http.server 8000
```

Then open http://localhost:8000/. Opening `index.html` directly from disk also works.

## Routes

| Route | What |
|---|---|
| `/` | Gallery of all layouts, with a desktop/mobile preview switch |
| `/compare/` | All layouts live, side by side |
| `/credits/` | Source and licence of every photo |
| `/sites/image-led/` | Full website from layout 01: Home, Services, Our Work, About, Contact |
| `/sites/local-trust/` | Full website from layout 13: Home, Services, Our Work, About, Contact |
| `/layouts/00/` | Original homepage draft |
| `/layouts/01/` – `/layouts/07/` | Round 1 concepts |
| `/layouts/08/` – `/layouts/14/` | Round 2 concepts |
| `/concepts/*.html` | Old addresses; redirect to the routes above |

## Structure

- `layouts/NN/index.html`: each layout is one self-contained page with its own inline styles.
- `assets/base.css`: shared reset, placeholder, focus and skip-link styles.
- `assets/layouts.js`: the list of layouts (names, descriptions) and the "All layouts" bar shown at the bottom of every layout. Add or rename layouts here.
- `assets/photos/`: CC0 stock photos (sources on `/credits/`). Replace them with real workshop photos, keeping the same file names or updating each `<img>` and its `alt` text.

## Full websites

Each site in `sites/<name>/` has one shared stylesheet (`site.css`) and a folder per page. They are design-only: forms don't submit and the map is an illustration. The dark strip at the top of each page comes from `assets/layouts.js`; remove that script tag when launching.

## Picking a design

Copy the chosen `layouts/NN/index.html` to the site root, change `../../assets/` to `assets/`, and remove the `layouts.js` script tag.
