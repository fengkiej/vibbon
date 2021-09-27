"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maulina = void 0;
// method from: https://www.clipstudio.net/how-to-draw/archives/156922
var color_generator_1 = require("../color_generator");
var prng_1 = require("../prng");
var color_harmony_1 = require("../color_harmony");
function generatePalette(options) {
    if (options === void 0) { options = {}; }
    var paletteTypes = ["analogous", "monochromatic"];
    var defaults = {
        starting_color: null,
        n: 5,
        palette_type: "analogous",
        with: null,
        shift_config: {
            hue_shift: {
                min: 10,
                max: 10
            },
            saturation_shift: {
                min: 22,
                max: 22
            },
            value_shift: {
                min: 15,
                max: 15
            }
        }
    };
    var _options = __assign(__assign({}, defaults), options);
    var hsvColor = _options.starting_color;
    var n = _options.n;
    if (typeof n != 'number')
        throw new Error("invalid type for n: " + n + ".");
    if (paletteTypes.indexOf(_options.palette_type) == -1)
        throw new Error("invalid palette_type of " + _options.palette_type);
    if (hsvColor == null) {
        hsvColor = (0, color_generator_1.randomColor)(_options);
    }
    var _palette;
    switch (_options.palette_type) {
        case "analogous":
            _palette = generateAnalogousPalette(hsvColor, n, options);
            break;
        case "monochromatic":
            _palette = generateMonochromaticPalette(hsvColor, n, options);
            break;
        default:
            throw new Error("invalid palette_type of " + _options.palette_type + ".");
    }
    if (_options.with != null)
        _palette = color_harmony_1.colorHarmony.addHarmonyToPalette(_palette, _options.with);
    return _palette;
}
var generateMonochromaticPalette = function (hsvColor, n, options) {
    if (n === void 0) { n = 5; }
    if (options === void 0) { options = {}; }
    var defaults = {
        shift_config: {
            saturation_shift: {
                min: 22,
                max: 22
            },
            value_shift: {
                min: 15,
                max: 15
            }
        }
    };
    var _options = __assign(__assign({}, defaults), options);
    var _palette = [];
    var saturationShiftMin = _options.shift_config.saturation_shift.min;
    var saturationShiftMax = _options.shift_config.saturation_shift.max;
    var valueShiftMin = _options.shift_config.value_shift.min;
    var valueShiftMax = _options.shift_config.value_shift.max;
    var mid = Math.floor(n / 2);
    _palette[mid] = hsvColor;
    for (var i = mid - 1; i >= 0; i--) {
        var saturationShift = prng_1.prng.randomInRange(saturationShiftMin, saturationShiftMax);
        var valueShift = prng_1.prng.randomInRange(valueShiftMin, valueShiftMax);
        var prevColor = _palette[i + 1];
        var nextColorCombination = getNextColorCombination(prevColor, { h: 0, s: saturationShift, v: valueShift });
        var nextColor = nextColorCombination[0];
        _palette[i] = nextColor;
    }
    for (var i = mid + 1; i < n; i++) {
        var saturationShift = prng_1.prng.randomInRange(saturationShiftMin, saturationShiftMax);
        var valueShift = prng_1.prng.randomInRange(valueShiftMin, valueShiftMax);
        var prevColor = _palette[i - 1];
        var nextColorCombination = getNextColorCombination(prevColor, { h: 0, s: saturationShift, v: valueShift });
        var nextColor = nextColorCombination[1];
        _palette[i] = nextColor;
    }
    return _palette;
};
var generateAnalogousPalette = function (hsvColor, n, options) {
    if (n === void 0) { n = 5; }
    if (options === void 0) { options = {}; }
    var defaults = {
        shift_config: {
            hue_shift: {
                min: 10,
                max: 10
            },
            saturation_shift: {
                min: 22,
                max: 22
            },
            value_shift: {
                min: 15,
                max: 15
            }
        }
    };
    var _options = __assign(__assign({}, defaults), options);
    var _palette = [];
    var direction = Math.round(prng_1.prng.randomInRange(0, 1)); // 0: shift hue to left (warmer light), 1: shift hue to right (cooler shadow)
    var hueShiftMin = _options.shift_config.hue_shift.min;
    var hueShiftMax = _options.shift_config.hue_shift.max;
    var saturationShiftMin = _options.shift_config.saturation_shift.min;
    var saturationShiftMax = _options.shift_config.saturation_shift.max;
    var valueShiftMin = _options.shift_config.value_shift.min;
    var valueShiftMax = _options.shift_config.value_shift.max;
    var mid = Math.floor(n / 2);
    _palette[mid] = hsvColor;
    for (var i = mid - 1; i >= 0; i--) {
        var hueShift = prng_1.prng.randomInRange(hueShiftMin, hueShiftMax);
        var saturationShift = prng_1.prng.randomInRange(saturationShiftMin, saturationShiftMax);
        var valueShift = prng_1.prng.randomInRange(valueShiftMin, valueShiftMax);
        var prevColor = _palette[i + 1];
        var nextColorCombination = getNextColorCombination(prevColor, { h: hueShift, s: saturationShift, v: valueShift });
        var nextColor = direction == 0 ? nextColorCombination[4] : nextColorCombination[0];
        _palette[i] = nextColor;
    }
    for (var i = mid + 1; i < n; i++) {
        var hueShift = prng_1.prng.randomInRange(hueShiftMin, hueShiftMax);
        var saturationShift = prng_1.prng.randomInRange(saturationShiftMin, saturationShiftMax);
        var valueShift = prng_1.prng.randomInRange(valueShiftMin, valueShiftMax);
        var prevColor = _palette[i - 1];
        var nextColorCombination = getNextColorCombination(prevColor, { h: hueShift, s: saturationShift, v: valueShift });
        var nextColor = direction == 0 ? nextColorCombination[1] : nextColorCombination[5];
        _palette[i] = nextColor;
    }
    return _palette;
};
var getNextColorCombination = function (hsvColor, shifts) {
    var hue_0 = hsvColor.h - shifts.h;
    hue_0 = hue_0 > 360 ? hue_0 % 360 : hue_0;
    hue_0 = hue_0 < 0 ? 360 + (hue_0 % 360) : hue_0;
    var saturation_0 = hsvColor.s - shifts.s;
    saturation_0 = saturation_0 > 100 ? 100 : saturation_0;
    saturation_0 = saturation_0 < 0 ? 0 : saturation_0;
    var value_0 = hsvColor.v - shifts.v;
    value_0 = value_0 > 100 ? 100 : value_0;
    value_0 = value_0 < 0 ? 0 : value_0;
    var hue_1 = hsvColor.h + shifts.h;
    hue_1 = hue_1 > 360 ? hue_1 % 360 : hue_1;
    hue_1 = hue_1 < 0 ? 360 + (hue_1 % 360) : hue_1;
    var saturation_1 = hsvColor.s + shifts.s;
    saturation_1 = saturation_1 > 100 ? 100 : saturation_1;
    saturation_1 = saturation_1 < 0 ? 0 : saturation_1;
    var value_1 = hsvColor.v + shifts.v;
    value_1 = value_1 > 100 ? 100 : value_1;
    value_1 = value_1 < 0 ? 0 : value_1;
    return {
        0: {
            h: hue_0, s: saturation_0, v: value_0
        },
        1: {
            h: hue_0, s: saturation_0, v: value_1
        },
        2: {
            h: hue_0, s: saturation_1, v: value_0
        },
        3: {
            h: hue_0, s: saturation_1, v: value_1
        },
        4: {
            h: hue_1, s: saturation_0, v: value_0
        },
        5: {
            h: hue_1, s: saturation_0, v: value_1
        },
        6: {
            h: hue_1, s: saturation_1, v: value_0
        },
        7: {
            h: hue_1, s: saturation_1, v: value_1
        }
    };
};
exports.maulina = { generatePalette: generatePalette, getNextColorCombination: getNextColorCombination, };
