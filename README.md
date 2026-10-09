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
| `/layouts/00/` | Original homepage draft |
| `/layouts/01/` – `/layouts/07/` | Round 1 concepts |
| `/layouts/08/` – `/layouts/14/` | Round 2 concepts |
| `/concepts/*.html` | Old addresses; redirect to the routes above |

## Structure

- `layouts/NN/index.html`: each layout is one self-contained page with its own inline styles.
- `assets/base.css`: shared reset, placeholder, focus and skip-link styles.
- `assets/layouts.js`: the list of layouts (names, descriptions) and the "All layouts" bar shown at the bottom of every layout. Add or rename layouts here.
- `assets/img/ph-*.svg`: placeholder images. Replace them with real workshop photos, keeping each `<img>` and updating its `alt` text.

## Picking a design

Copy the chosen `layouts/NN/index.html` to the site root, change `../../assets/` to `assets/`, and remove the `layouts.js` script tag.
