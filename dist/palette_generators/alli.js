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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alli = void 0;
// method from: https://designerup.co/blog/practical-guide-to-perfect-ui-color-palettes/ | https://www.youtube.com/watch?v=GyVMoejbGFg&t=1007s
var templates = __importStar(require("../templates.json"));
var color_generator_1 = require("../color_generator");
var prng_1 = require("../prng");
var color_harmony_1 = require("../color_harmony");
function generatePalette(options) {
    if (options === void 0) { options = {}; }
    var defaults = {
        starting_color: null,
        n: 5,
        template: null,
        with: null, // for options see '../harmonies.json'
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
    if (_options.with != null)
        _palette = color_harmony_1.colorHarmony.addHarmonyToPalette(_palette, _options.with);
    return _palette;
}
exports.alli = { generatePalette: generatePalette };
