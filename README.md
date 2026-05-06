# The Print Patel — website

Next.js marketing site for **The Print Patel** (custom 3D printing, Kharghar / Navi Mumbai).

## Commands

```bash
npm install
npm run dev      # http://localhost:3000 (or next free port)
npm run build
npm run start    # production server after build
npm run lint
```

## Environment

Optional:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL (metadata, Open Graph base). Example: `https://theprintpatel.example.com`

Copy `.env.example` to `.env.local` if you add secrets later.

## Content assets

- **`public/gallery/`** — still images for the work grid (referenced from [`src/lib/constants.ts`](src/lib/constants.ts)).
- **`public/videos/`** — timelapse MP4/WebM + poster JPGs for the motion sections.

To re-encode new `.avi` clips, see [`scripts/transcode-timelapses.sh`](scripts/transcode-timelapses.sh).

## Related repo

Remotion reels live in the sibling folder **`../remotion-print-patel/`** (workspace root).
