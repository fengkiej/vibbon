// https://www.30secondsofcode.org/js/s/rgb-to-hsb
const RGBToHSV = (r, g, b) => {
  if (typeof r != 'number' || typeof g != 'number' || typeof b != 'number') {
    throw new Error(`invalid parameter: rgb(${r}, ${g}, ${b})`);
  }

  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b);
  const n = v - Math.min(r, g, b);

  const h =
    n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n; // eslint-disable-line max-len
  return {
    h: 60 * (h < 0 ? h + 6 : h),
    s: v && (n / v) * 100,
    v: v * 100,
  };
};

// https://www.30secondsofcode.org/js/s/hsb-to-rgb
const HSVToRGB = (h, s, v) => {
  if (typeof h != 'number' || typeof s != 'number' || typeof v != 'number') {
    throw new Error(`invalid parameter: hsv(${h}, ${s}, ${v})`);
  }

  s /= 100;
  v /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => v * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return {
    r: 255 * f(5),
    g: 255 * f(3),
    b: 255 * f(1),
  };
};


export const utils = {
  RGBToHSV, HSVToRGB,
};
