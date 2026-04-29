# Media & reference links (owner checklist)

Use this list to source **permitted** imagery and specs for your live site. Do not commit copyrighted marketing assets until you have a license or official embed permission.

## Bambu Lab P1S Combo

- Official product/store pages change over time; start at the manufacturer domain (Bambu Lab) and download **only** assets their terms allow for your use case.
- **REPLACE** hero and gallery images with photos of **your** machine and prints.

## Creality Ender-3 S1 Pro

- Same approach: use Creality’s official channels for technical specs; use **your own** photos on the marketing site unless you have explicit rights.

## Video embeds

- In `src/lib/constants.ts`, add entries to `SITE.videoEmbeds` as `{ title, youtubeId }` **only** for videos you may embed (your own, Creative Commons where allowed, or OEM official embed policy).

## Placeholders

- Gallery tiles are abstract gradients marked **Replace image**. Swap in `public/gallery/` (or similar) and use `next/image` when you add real photos.
