"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prng = void 0;
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
// https://www.30secondsofcode.org/js/s/shuffle
var shuffle = function (_a) {
    var _b;
    var arr = _a.slice(0);
    if (!Array.isArray(arr))
        throw new Error("invalid parameter: " + arr);
    var m = arr.length;
    while (m) {
        var i = Math.floor(randomInRange(0, m--));
        _b = [arr[i], arr[m]], arr[m] = _b[0], arr[i] = _b[1];
    }
    return arr;
};
exports.prng = {
    randomInRange: randomInRange,
    setSeed: setSeed,
    getSeed: getSeed,
    shuffle: shuffle,
};
