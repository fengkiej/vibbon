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
function generatePalette(hsvColor, n, options) {
    if (hsvColor === void 0) { hsvColor = null; }
    if (n === void 0) { n = 5; }
    if (options === void 0) { options = {}; }
    var paletteTypes = ["analogous", "analogousWithComplementaryAccent"];
    var defaults = {
        palette_type: null,
        palette_type_config: {
            analogous: {
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
        }
    };
    var _options = __assign(__assign({}, defaults), options);
    if (typeof n != 'number')
        throw new Error("invalid type for n: " + n + ".");
    if (_options.palette_type == null)
        _options.palette_type = "analogous"; // set default to "analogous"
    if (paletteTypes.indexOf(_options.palette_type) == -1)
        throw new Error("invalid palette_type of " + _options.palette_type);
    if (hsvColor == null) {
        hsvColor = (0, color_generator_1.randomColor)(_options);
    }
    var _palette;
    switch (_options.palette_type) {
        case "analogous":
            _palette = _generateAnalogousPalette(hsvColor, n, options);
            break;
        case "analogousWithComplementaryAccent":
            _palette = _generateAnalogousPalette(hsvColor, n, options);
            var replaceIndex = Math.floor((0, prng_1.randomInRange)(0, n));
            var harmonies = color_harmony_1.colorHarmony.getHarmonies(_palette[replaceIndex]);
            _palette[replaceIndex] = harmonies.complementary[1];
            break;
        default:
            _palette = _generateAnalogousPalette(hsvColor, n, options);
            break;
    }
    return _palette;
}
var _generateMonochromaticPalette = function (hsvColor, n, options) {
    if (n === void 0) { n = 5; }
    if (options === void 0) { options = {}; }
};
var _generateAnalogousPalette = function (hsvColor, n, options) {
    if (n === void 0) { n = 5; }
    if (options === void 0) { options = {}; }
    var defaults = {
        palette_type: null,
        palette_type_config: {
            analogous: {
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
        }
    };
    var _options = __assign(__assign({}, defaults), options);
    var _palette = [];
    var direction = Math.round((0, prng_1.randomInRange)(0, 1)); // 0: shift hue to left (warmer light), 1: shift hue to right (cooler shadow)
    var hueShiftMin = _options.palette_type_config.analogous.hue_shift.min;
    var hueShiftMax = _options.palette_type_config.analogous.hue_shift.max;
    var saturationShiftMin = _options.palette_type_config.analogous.saturation_shift.min;
    var saturationShiftMax = _options.palette_type_config.analogous.saturation_shift.max;
    var valueShiftMin = _options.palette_type_config.analogous.value_shift.min;
    var valueShiftMax = _options.palette_type_config.analogous.value_shift.max;
    var mid = Math.floor(n / 2);
    _palette[mid] = hsvColor;
    for (var i = mid - 1; i >= 0; i--) {
        var hueShift = (0, prng_1.randomInRange)(hueShiftMin, hueShiftMax);
        var saturationShift = (0, prng_1.randomInRange)(saturationShiftMin, saturationShiftMax);
        var valueShift = (0, prng_1.randomInRange)(valueShiftMin, valueShiftMax);
        var prevColor = _palette[i + 1];
        var nextColor = void 0;
        // TODO: handle for negatives
        if (direction == 0) {
            nextColor = {
                h: (prevColor.h + hueShift) % 360,
                s: (prevColor.s - saturationShift) > 100 ? 100 : (prevColor.s - saturationShift),
                v: (prevColor.v - valueShift) > 100 ? 100 : (prevColor.v - valueShift)
            };
        }
        if (direction == 1) {
            nextColor = {
                h: (prevColor.h - hueShift) % 360,
                s: (prevColor.s - saturationShift) > 100 ? 100 : (prevColor.s - saturationShift),
                v: (prevColor.v - valueShift) > 100 ? 100 : (prevColor.v - valueShift)
            };
        }
        _palette[i] = nextColor;
    }
    for (var i = mid + 1; i < n; i++) {
        var hueShift = (0, prng_1.randomInRange)(hueShiftMin, hueShiftMax);
        var saturationShift = (0, prng_1.randomInRange)(saturationShiftMin, saturationShiftMax);
        var valueShift = (0, prng_1.randomInRange)(valueShiftMin, valueShiftMax);
        var prevColor = _palette[i - 1];
        var nextColor = void 0;
        if (direction == 0) {
            nextColor = {
                h: (prevColor.h - hueShift) % 360,
                s: (prevColor.s - saturationShift) > 100 ? 100 : (prevColor.s - saturationShift),
                v: (prevColor.v + valueShift) > 100 ? 100 : (prevColor.v + valueShift)
            };
        }
        if (direction == 1) {
            nextColor = {
                h: (prevColor.h + hueShift) % 360,
                s: (prevColor.s - saturationShift) > 100 ? 100 : (prevColor.s - saturationShift),
                v: (prevColor.v + valueShift) > 100 ? 100 : (prevColor.v + valueShift)
            };
        }
        _palette[i] = nextColor;
    }
    return _palette;
};
exports.maulina = { generatePalette: generatePalette };
