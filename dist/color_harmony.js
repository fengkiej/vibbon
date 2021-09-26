"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorHarmony = exports.getHarmonies = void 0;
/* degree arrays taken from: https://github.com/brehaut/color-js/ */
var harmonies = require("./harmonies.json");
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
        harmonies[e].forEach(function (deg) {
            newValues.push({
                h: (hsvColor.h + deg) % 360,
                s: hsvColor.s,
                v: hsvColor.v,
            });
        });
        result[e] = newValues;
    };
    /* eslint-disable-next-line guard-for-in */
    for (var e in harmonies) {
        _loop_1(e);
    }
    // const rgb = utils.HSVToRGB(hsvColor.h, hsvColor.s, hsvColor.v);
    // TODO: add tint, shade, and tone
    return result;
};
exports.getHarmonies = getHarmonies;
exports.colorHarmony = {
    getHarmonies: exports.getHarmonies,
};
