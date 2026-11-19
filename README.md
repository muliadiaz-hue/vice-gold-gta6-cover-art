# Vice Gold — GTA 6-style cover maker

[![make.fun · gta6-cover-art-01](https://make.fun/badge/gta6-cover-art-01.svg)](https://make.fun/bounty/gta6-cover-art-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)
[![rank](https://make.fun/badge/gta6-cover-art-01/muliadiaz-hue/vice-gold-gta6-cover-art/rank.svg)](https://make.fun/bounty/gta6-cover-art-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)
[![reward](https://make.fun/badge/gta6-cover-art-01/muliadiaz-hue/vice-gold-gta6-cover-art/reward.svg)](https://make.fun/bounty/gta6-cover-art-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)

An offline browser app that turns your photos and a caption into a
GTA 6-style multi-panel cover — the golden-hour poster look: a solo lead in
a convertible at sunset, a timeline of captioned scene panels (place +
time), giant gold-gradient lettering, and the full winner's apparatus
(WANTED stars, VOL. 07, EST. 2026 seal, Collector's Edition ribbon,
barcode, credit line).

Entry for the make.fun bounty: https://make.fun/bounty/gta6-cover-art-01

## What it does

- **Golden-hour poster layout** — hero photo plus six captioned scene
  panels (2×3 grid) in landscape; every post size is its own cover
  variant: landscape "VICE GOLD — Golden hour heist", portrait
  "GOLD RUSH — Coast to Coast", square "VICE GOLD", story
  "AFTERGLOW — Last light in Leonida". Grids are always measured from
  the space left after the hero and title, so every panel fills the
  frame with no empty strip.
- **Your photos, your caption** — click a panel to select it, drag to
  pan, scroll to zoom, upload your own photo for any panel, fill all
  panels from one photo or spread all photos across them. Title,
  subtitle, tagline, city, and ribbon are all editable, live.
- **Seven grades** — Vice Gold (warm gold + coral, the default),
  Vice Sunset, Neon Night, Golden Hour, Duotone Pink/Teal, Comic Ink,
  Natural — plus strength, contrast, saturation, grain, and vignette
  sliders and a halftone print-dots toggle. Grain is fixed-seed, so the
  same settings always paint the same pixels.
- **Eight layouts** — Hero, Comic, and 8/7/6/4/2/1-panel arrangements.
- **One-click export** — downloads the cover as a PNG at the chosen
  post size (1920×1080, 1080×1350, 1080×1080, or 1080×1920), or all
  four sizes at once.
- **Fully offline** — no network requests, no uploads; photos never
  leave your machine. Undo/redo included.

## Run it

```sh
node serve.ts          # serves app/ on http://localhost:8080
```

Open http://localhost:8080, pick a panel, tweak the caption, export.

## Hand in (what the grader runs)

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

This copies `app/` and `screenshots/` into `out/` and writes
`out/dossier.json` with the vendored make.fun library.

## Fonts

Passion One and Anton, SIL Open Font License 1.1 (see `app/fonts/OFL.txt`).
Sample photos in `app/samples/` are AI-generated stand-ins made for this
entry; the hero shot is an original golden-hour convertible photo.
