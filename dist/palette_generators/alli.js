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
exports.alli = void 0;
// method from: https://designerup.co/blog/practical-guide-to-perfect-ui-color-palettes/ | https://www.youtube.com/watch?v=GyVMoejbGFg&t=1007s
var templates = require("../templates.json");
var color_generator_1 = require("../color_generator");
var prng_1 = require("../prng");
function generatePalette(options) {
    if (options === void 0) { options = {}; }
    var defaults = {
        starting_color: null,
        n: 5,
        template: null
    };
    var _options = __assign(__assign({}, defaults), options);
    var hsvColor = _options.starting_color;
    var n = _options.n;
    if (typeof n != 'number')
        throw new Error("invalid type for n: " + n + ".");
    var _palette = [];
    if (hsvColor != null) {
        _palette.push(hsvColor);
    }
    else {
        if (_options.template == null) {
            var randomTemplateIndex = prng_1.prng.randomInRange(0, Object.keys(templates.color).length);
            _options.template = templates[randomTemplateIndex];
        }
        hsvColor = color_generator_1.colorGenerator.randomColor(_options);
        _palette.push(hsvColor);
    }
    for (var i = 0; i < n - 1; i++) {
        var color = color_generator_1.colorGenerator.randomColor({
            lock: {
                saturation: hsvColor.s,
                value: hsvColor.v
            }
        });
        _palette.push(color);
    }
    return _palette;
}
exports.alli = { generatePalette: generatePalette };
