export type Photo = { src: string; alt: string; width: number; height: number };

const p = (n: number, alt: string, width: number, height: number): Photo => ({
  src: `/images/gallery/bpg-race-${String(n).padStart(2, "0")}.webp`,
  alt,
  width,
  height,
});

// Original race photography by Aromal S (Thuzhathaalam Social Media).
export const ownPhotos: Photo[] = [
  p(1, "VBC Kainakary steersmen driving their snake boat through the spray", 1500, 1000),
  p(2, "VBC Kainakary crew mid-stroke as spectators line the bank", 1600, 1066),
  p(3, "Crew in red and blue raising their paddles as the boat surges ahead", 1600, 1066),
  p(4, "A full snake boat crew racing towards the camera, spray flying", 1600, 1066),
  p(5, "IBC crew and steersmen powering past a houseboat full of fans", 1600, 1066),
  p(6, "PBC Pallathuruthy paddlers reaching forward at the bow", 1600, 1200),
  p(7, "PBC Pallathuruthy crew in perfect sync at the prow", 1600, 1200),
  p(8, "UBC Kainakary steersmen powering their boat past the Nehru Trophy pavilion", 1600, 1200),
  p(9, "Two snake boats neck and neck in a blur of spray before a packed grandstand", 1600, 1066),
  p(10, "Village Boat Club Kainakary crew raising their paddles past a course marker", 1600, 1067),
  p(11, "UBC crew charging head-on, paddles fanned out in a wall of spray", 1600, 1066),
  p(12, "Kerala Police crew in orange racing towards the bridge", 1440, 1019),
  p(13, "UBC steersmen standing tall on a black snake boat as the crew drives forward", 1600, 1066),
  p(14, "PBC crew and a rival boat racing side by side, water erupting around the paddles", 1600, 900),
  p(15, "PBC crew in blue and yellow digging in at the bow", 1600, 1066),
  p(16, "PBC paddlers lunging forward from the prow of boat number one", 1600, 1066),
  p(17, "PBC crew driving through the spray ahead of a rival boat", 1600, 1066),
  p(18, "PBC Pallathuruthy crew at full stretch at the bow", 1600, 1200),
];

const own = (n: number) => ownPhotos[n - 1];

// Collage rows: nine photos each, mixing crews and angles so neighbours differ.
export const collageRows: Photo[][] = [
  [own(1), own(9), own(3), own(11), own(5), own(13), own(7), own(15), own(17)],
  [own(2), own(10), own(4), own(12), own(6), own(14), own(8), own(16), own(18)],
];
