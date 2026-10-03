"""Cut the white BPG crest out of the blue panel of the brand card and trace it to SVG.

Usage: python3 trace.py <brand-card.jpg>
Writes emblem.svg next to this script. Needs: opencv-python-headless, numpy, potracer.
The crop box matches the 1770x889 brand card the crest was taken from.
"""
import os
import sys

import cv2
import numpy as np
import potrace

HERE = os.path.dirname(os.path.abspath(__file__))
CROP = (24, 556, 24, 562)  # y0, y1, x0, x1 of the blue panel
SCALE = 4  # trace at 4x for smoother curves

im = cv2.imread(sys.argv[1])
y0, y1, x0, x1 = CROP
panel = im[y0:y1, x0:x1].astype(np.float32)

# The brand blue has almost no red, the crest is white: red is a clean key.
white = np.clip((panel[:, :, 2] - 40) / (230 - 40), 0, 1)
up = cv2.resize(white, None, fx=SCALE, fy=SCALE, interpolation=cv2.INTER_CUBIC)
up = cv2.GaussianBlur(up, (0, 0), 1.2)
mask = (up > 0.5).astype(np.uint8) * 255

# Drop JPEG specks.
n, labels, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
clean = np.zeros_like(mask)
for i in range(1, n):
    if stats[i, cv2.CC_STAT_AREA] > 300:
        clean[labels == i] = 255

# potracer traces the False pixels, so pass the inverted mask.
path = potrace.Bitmap(~(clean > 127)).trace(
    turdsize=40,
    turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY,
    alphamax=1.0,
    opticurve=True,
    opttolerance=0.2,
)

parts = []
for curve in path:
    s = curve.start_point
    d = [f"M{s.x:.2f},{s.y:.2f}"]
    for seg in curve.segments:
        e = seg.end_point
        if seg.is_corner:
            d.append(f"L{seg.c.x:.2f},{seg.c.y:.2f}L{e.x:.2f},{e.y:.2f}")
        else:
            d.append(f"C{seg.c1.x:.2f},{seg.c1.y:.2f} {seg.c2.x:.2f},{seg.c2.y:.2f} {e.x:.2f},{e.y:.2f}")
    d.append("Z")
    parts.append("".join(d))

h, w = clean.shape
with open(os.path.join(HERE, "emblem.svg"), "w") as f:
    f.write(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">'
        f'<path fill="#fff" fill-rule="evenodd" d="{" ".join(parts)}"/></svg>'
    )
print(f"{len(parts)} paths -> emblem.svg")
