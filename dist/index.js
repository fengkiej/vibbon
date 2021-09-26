"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vibbon = void 0;
var utils_js_1 = require("./utils.js");
var palette_generators_1 = require("./palette_generators");
var color_generator_1 = require("./color_generator");
var prng_1 = require("./prng");
var color_harmony_1 = require("./color_harmony");
var setSeed = function (_seed) {
    prng_1.prng.setSeed(_seed);
};
var getHarmonies = function (hsvColor) {
    return color_harmony_1.colorHarmony.getHarmonies(hsvColor);
};
var randomColor = function (options) {
    if (options === void 0) { options = {}; }
    return color_generator_1.colorGenerator.randomColor(options);
};
var randomPalette = function (method, hsvColor, n, options) {
    if (method === void 0) { method = 'random'; }
    if (hsvColor === void 0) { hsvColor = null; }
    if (n === void 0) { n = 5; }
    if (options === void 0) { options = {}; }
    if (!palette_generators_1.paletteGenerators.hasOwnProperty(method)) {
        throw new Error("Invalid palette generation method of " + method + ".");
    }
    return palette_generators_1.paletteGenerators[method].generatePalette(hsvColor, n, options);
};
exports.Vibbon = {
    setSeed: setSeed,
    getHarmonies: getHarmonies,
    randomColor: randomColor,
    randomPalette: randomPalette,
    utils: utils_js_1.utils,
};
