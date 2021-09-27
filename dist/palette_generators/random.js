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
exports.random = void 0;
var color_generator_1 = require("../color_generator");
var color_harmony_1 = require("../color_harmony");
function generatePalette(options) {
    if (options === void 0) { options = {}; }
    var defaults = {
        starting_color: null,
        n: 5,
        with: null, // for options see '../harmonies.json'
    };
    var _options = __assign(__assign({}, defaults), options);
    var hsvColor = _options.starting_color;
    var n = _options.n;
    if (hsvColor != null && !(['h', 's', 'v'].every(function (k) { return hsvColor.hasOwnProperty(k); }))) {
        throw new Error("invalid hsvColor of " + hsvColor + ".");
    }
    if (hsvColor != null
        && (typeof hsvColor.h != 'number' ||
            typeof hsvColor.s != 'number' ||
            typeof hsvColor.v != 'number')) {
        throw new Error("invalid hsvColor of " + hsvColor + ".");
    }
    if (typeof n != 'number')
        throw new Error("invalid type for n: " + n + ".");
    var _palette = [];
    if (hsvColor != null) {
        _palette.push(hsvColor);
    }
    else {
        hsvColor = color_generator_1.colorGenerator.randomColor(_options);
        _palette.push(hsvColor);
    }
    for (var i = 0; i < n - 1; i++) {
        var color = color_generator_1.colorGenerator.randomColor(_options);
        _palette.push(color);
    }
    if (_options.with != null)
        _palette = color_harmony_1.colorHarmony.addHarmonyToPalette(_palette, _options.with);
    return _palette;
}
exports.random = { generatePalette: generatePalette, colorGenerator: color_generator_1.colorGenerator };
