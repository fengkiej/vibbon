import {utils} from './utils.js';
import {paletteGenerators} from './palette_generators';
import {colorGenerator} from './color_generator';
import {prng} from './prng';
import {colorHarmony} from './color_harmony';

const setSeed = (_seed) => {
  prng.setSeed(_seed);
};

const getHarmonies = (hsvColor) => {
  return colorHarmony.getHarmonies(hsvColor);
};

const randomColor = (options = {}) => {
  return colorGenerator.randomColor(options);
};

const randomPalette = (
    method = 'random',
    hsvColor = null,
    n = 5,
    options = {}) => {
  if (!paletteGenerators.hasOwnProperty(method)) {
    throw new Error(`Invalid palette generation method of ${method}.`);
  }

  return paletteGenerators[method].generatePalette(hsvColor, n, options);
};

export const Vibbon = {
  setSeed, getHarmonies, randomColor, randomPalette, utils,
};
