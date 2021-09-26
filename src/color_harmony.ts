/* degree arrays taken from: https://github.com/brehaut/color-js/ */
import harmonies = require('./harmonies.json');

export const getHarmonies = (hsvColor) => {
  if (!(['h', 's', 'v'].every((k) => hsvColor.hasOwnProperty(k)))) {
    throw new Error(`invalid hsvColor of ${hsvColor}`);
  }

  // eslint-disable-next-line max-len
  if (typeof hsvColor.h != 'number' || typeof hsvColor.s != 'number' || typeof hsvColor.v != 'number') {
    throw new Error(`invalid hsvColor of ${hsvColor}`);
  }

  const result = {
    'color': [hsvColor],
    'complementary': [],
    'splitComplementary': [],
    'splitComplementaryCW': [],
    'splitComplementaryCCW': [],
    'triadic': [],
    'clash': [],
    'tetradic': [],
    'fourToneCW': [],
    'fourToneCCW': [],
    'fiveToneA': [],
    'fiveToneB': [],
    'fiveToneC': [],
    'fiveToneD': [],
    'fiveToneE': [],
    'sixToneCW': [],
    'sixToneCCW': [],
    'neutral': [],
    'analogous': [],
  };

  /* eslint-disable-next-line guard-for-in */
  for (const e in harmonies) {
    if (typeof e != 'string') throw new Error(`invalid key of ${e}.`);
    const newValues = [];
    harmonies[e].forEach((deg) => {
      newValues.push(
          {
            h: (hsvColor.h + deg) % 360,
            s: hsvColor.s,
            v: hsvColor.v,
          },
      );
    });

    result[e] = newValues;
  }

  // const rgb = utils.HSVToRGB(hsvColor.h, hsvColor.s, hsvColor.v);
  // TODO: add tint, shade, and tone

  return result;
};

export const colorHarmony = {
  getHarmonies,
};

