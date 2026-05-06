#!/usr/bin/env bash
set -euo pipefail

SRC="$HOME/Downloads"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/videos"
mkdir -p "$OUT"

# id : source filename
mappings=(
  "tl-feature-1:video_2026-05-04_12-02-42.avi"
  "tl-feature-2:video_2026-05-01_13-52-07.avi"
  "tl-extra-1:video_2026-05-02_05-43-24.avi"
  "tl-extra-2:video_2026-04-29_04-04-16.avi"
  "tl-extra-3:video_2026-05-01_19-31-19.avi"
)

for m in "${mappings[@]}"; do
  id="${m%%:*}"
  src="${m#*:}"
  in="$SRC/$src"
  echo "==> $id from $src"
  ffmpeg -y -hide_banner -loglevel error -i "$in" \
    -vf "scale='min(1280,iw)':-2" \
    -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p \
    -movflags +faststart -an "$OUT/$id.mp4"
  ffmpeg -y -hide_banner -loglevel error -i "$in" \
    -vf "scale='min(1280,iw)':-2" \
    -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 -threads 4 -an "$OUT/$id.webm"
  ffmpeg -y -hide_banner -loglevel error -ss 1 -i "$OUT/$id.mp4" \
    -frames:v 1 -q:v 4 "$OUT/$id.jpg"
done

ls -lh "$OUT"
