#!/usr/bin/env bash
# Encode the rendered RGBA frames into the web videos and posters.
#
#   scripts/emblem/encode.sh <frames_dir>
#
# The site is dark only: frames are composited on pure black, which the page
# removes with mix-blend-mode: screen. Pass THEMES="light dark" to also get a
# white-background set for a light theme (blend with multiply).
# Outputs go to public/videos/bpg-emblem and public/images/brand.
set -euo pipefail

FRAMES=${1:?frames dir}
ROOT=$(cd "$(dirname "$0")/../.." && pwd)
VID="$ROOT/public/videos/bpg-emblem"
IMG="$ROOT/public/images/brand"
mkdir -p "$VID" "$IMG"

# Tag as BT.709 so browsers decode the background back to exact white/black.
COLOR="-colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv"

for theme in ${THEMES:-dark}; do
  bg=$([ "$theme" = light ] && echo white || echo black)
  for size in 1080 720; do
    # Composite in RGB, then convert with accurate rounding so the background
    # lands on exact video white (Y 235) / black (Y 16) and the blend leaves no box.
    graph="color=c=$bg:s=1080x1080:r=30,format=rgb24[bg];[0:v]format=rgba[fg];[bg][fg]overlay=format=rgb:shortest=1,scale=$size:$size:flags=lanczos+accurate_rnd+full_chroma_int:in_range=full:out_range=tv:out_color_matrix=bt709,format=yuv420p"

    ffmpeg -y -loglevel error -framerate 30 -i "$FRAMES/f_%04d.png" -filter_complex "$graph" \
      -c:v libx264 -preset veryslow -crf 22 -profile:v high -tune animation \
      -g 150 -movflags +faststart -an $COLOR "$VID/$theme-$size.mp4"

    ffmpeg -y -loglevel error -framerate 30 -i "$FRAMES/f_%04d.png" -filter_complex "$graph" \
      -c:v libvpx-vp9 -b:v 0 -crf 45 -row-mt 1 -deadline good -cpu-used 1 \
      -g 150 -an $COLOR "$VID/$theme-$size.webm"
  done

  # Poster: first frame (the loop starts and ends here).
  ffmpeg -y -loglevel error -i "$FRAMES/f_0000.png" \
    -filter_complex "color=c=$bg:s=1080x1080[bg];[bg][0:v]overlay=shortest=1" \
    -frames:v 1 -c:v libwebp -quality 88 "$IMG/bpg-emblem-$theme.webp"
done

ls -la "$VID" "$IMG"/bpg-emblem-*
