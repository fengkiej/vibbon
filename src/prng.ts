let seed = null;

const setSeed = (_seed) => {
  if (typeof _seed != 'number' && _seed != null) {
    throw new Error(`invalid parameter of ${_seed}.`);
  }
  seed = _seed;
};

const getSeed = () => {
  return seed;
};

const randomInRange = (min, max) => {
  // http://indiegamr.com/generate-repeatable-random-numbers-in-js/
  if (typeof min != 'number' || typeof max != 'number') {
    throw new Error(`invalid parameter: max: ${max}; min: ${min}.`);
  }
  if (min > max) throw new Error(`min: ${min} should be less than max: ${max}`);

  if (seed == null) seed = Date.now();
  if (seed != null) seed = (seed * 9301 + 49297) % 233280;

  max = max || 1;
  min = min || 0;

  const rnd = seed / 233280;

  return min + rnd * (max - min);
};


// https://www.30secondsofcode.org/js/s/shuffle
const shuffle = ([...arr]) => {
  if (!Array.isArray(arr)) throw new Error(`invalid parameter: ${arr}`);

  let m = arr.length;
  while (m) {
    const i = Math.floor(randomInRange(0, m--));
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

export const prng = {
  randomInRange, setSeed, getSeed, shuffle,
};
