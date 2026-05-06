# Media & reference links (owner checklist)

Use this list to source **permitted** imagery and specs for the live site. Do not commit copyrighted marketing assets until you have a license or official permission.

## Site content today

- **Gallery & motion**: Paths and captions are defined in [`src/lib/constants.ts`](../../src/lib/constants.ts) (`galleryItems`, `printerMotionClips`, `extraTimelapses`). Files live under **`public/gallery/`** and **`public/videos/`** (your own photos and transcoded timelapses).

## Bambu Lab P1S Combo

- Use the manufacturer’s official pages for **technical specs** only.
- On the marketing site, prefer **your own** photos of the machine and prints unless OEM terms explicitly allow otherwise.

## Creality Ender-3 S1 Pro

- Same as above: official channels for specs; **your own** photos on the customer-facing site unless you have explicit rights.

## Adding more media

- Drop new images into `public/gallery/` and add rows to `galleryItems`.
- Add MP4/WebM (+ optional poster) under `public/videos/` and wire entries in `printerMotionClips` / `extraTimelapses`.
