"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prng = exports.randomInRange = void 0;
var seed = null;
var setSeed = function (_seed) {
    if (typeof _seed != 'number' && _seed != null) {
        throw new Error("invalid parameter of " + _seed + ".");
    }
    seed = _seed;
};
var getSeed = function () {
    return seed;
};
var randomInRange = function (min, max) {
    // http://indiegamr.com/generate-repeatable-random-numbers-in-js/
    if (typeof min != 'number' || typeof max != 'number') {
        throw new Error("invalid parameter: max: " + max + "; min: " + min + ".");
    }
    if (min > max)
        throw new Error("min: " + min + " should be less than max: " + max);
    if (seed == null)
        seed = Date.now();
    if (seed != null)
        seed = (seed * 9301 + 49297) % 233280;
    max = max || 1;
    min = min || 0;
    var rnd = seed / 233280;
    return min + rnd * (max - min);
};
exports.randomInRange = randomInRange;
exports.prng = {
    randomInRange: exports.randomInRange,
    setSeed: setSeed,
    getSeed: getSeed,
};
