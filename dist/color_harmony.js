"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorHarmony = void 0;
/* degree arrays taken from: https://github.com/brehaut/color-js/ */
var harmonies_json_1 = __importDefault(require("./harmonies.json"));
var prng_1 = require("./prng");
var getHarmonies = function (hsvColor) {
    if (!(['h', 's', 'v'].every(function (k) { return hsvColor.hasOwnProperty(k); }))) {
        throw new Error("invalid hsvColor of " + hsvColor);
    }
    // eslint-disable-next-line max-len
    if (typeof hsvColor.h != 'number' || typeof hsvColor.s != 'number' || typeof hsvColor.v != 'number') {
        throw new Error("invalid hsvColor of " + hsvColor);
    }
    var result = {
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
    var _loop_1 = function (e) {
        if (typeof e != 'string')
            throw new Error("invalid key of " + e + ".");
        var newValues = [];
        harmonies_json_1.default[e].forEach(function (deg) {
            newValues.push({
                h: (hsvColor.h + deg) % 360,
                s: hsvColor.s,
                v: hsvColor.v,
            });
        });
        result[e] = newValues;
    };
    /* eslint-disable-next-line guard-for-in */
    for (var e in harmonies_json_1.default) {
        _loop_1(e);
    }
    // const rgb = utils.HSVToRGB(hsvColor.h, hsvColor.s, hsvColor.v);
    // TODO: add tint, shade, and tone
    return result;
};
var addHarmonyToPalette = function (palette, harmonyType) {
    var n = palette.length;
    var colorSelectionIndex = Math.floor(prng_1.prng.randomInRange(0, n));
    var colorSelection = palette[colorSelectionIndex];
    var harmonyResults = getHarmonies(colorSelection);
    var selectedHarmony = harmonyResults[harmonyType];
    var paletteIndexes = Array.from(Array(n)
        .keys())
        .splice(colorSelectionIndex, colorSelectionIndex);
    var shuffledIndexes = prng_1.prng.shuffle(paletteIndexes);
    for (var i = 1; i < selectedHarmony.length; i++) {
        var r = shuffledIndexes[i];
        palette[r].h = selectedHarmony[i].h;
    }
    return palette;
};
exports.colorHarmony = {
    getHarmonies: getHarmonies,
    addHarmonyToPalette: addHarmonyToPalette,
};
