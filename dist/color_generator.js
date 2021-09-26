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
exports.colorGenerator = exports.randomColor = void 0;
var templates = require("./templates.json");
var prng_1 = require("./prng");
var utils_1 = require("./utils");
var randomColor = function (options) {
    if (options === void 0) { options = {}; }
    var defaults = {
        lock: {
            hue: null,
            saturation: null,
            value: null,
        },
        template: null,
    };
    var _options = __assign(__assign({}, defaults), options);
    // use RGB to generate random color: https://medialab.github.io/iwanthue/theory/
    var r = prng_1.prng.randomInRange(0, 255);
    var g = prng_1.prng.randomInRange(0, 255);
    var b = prng_1.prng.randomInRange(0, 255);
    var hsvColor = utils_1.utils.RGBToHSV(r, g, b); /* eslint-disable-line new-cap */
    if (_options.template != null) {
        hsvColor = applyColorTemplate(hsvColor, _options.template);
    }
    if (_options.lock.hue != null) {
        // eslint-disable-next-line max-len
        hsvColor.h = _options.lock.hue;
        hsvColor.h = hsvColor.h > 360 ? hsvColor.h % 360 : hsvColor.h;
        hsvColor.h = hsvColor.h < 0 ? 0 : hsvColor.h;
    }
    if (_options.lock.saturation != null) {
        hsvColor.s = _options.lock.saturation;
        hsvColor.s = hsvColor.s > 100 ? 100 : hsvColor.s;
        hsvColor.s = hsvColor.s < 0 ? 0 : hsvColor.s;
    }
    if (_options.lock.value != null) {
        hsvColor.v = _options.lock.value;
        hsvColor.v = hsvColor.v > 100 ? 100 : hsvColor.v;
        hsvColor.v = hsvColor.v < 0 ? 0 : hsvColor.v;
    }
    return hsvColor;
};
exports.randomColor = randomColor;
var applyColorTemplate = function (hsvColor, templateName) {
    if (!(['h', 's', 'v'].every(function (k) { return hsvColor.hasOwnProperty(k); }))) {
        throw new Error("invalid hsvColor of " + hsvColor + ".");
    }
    // eslint-disable-next-line max-len
    if (typeof hsvColor.h != 'number' || typeof hsvColor.s != 'number' || typeof hsvColor.v != 'number') {
        throw new Error("invalid hsvColor of " + hsvColor + ".");
    }
    if (typeof templateName != 'string') {
        throw new Error("invalid parameter, templateName: " + templateName + ".");
    }
    if (templateName == null)
        return hsvColor;
    var _template = templates.color[templateName];
    if (_template == null) {
        throw new Error("invalid template name of " + templateName + ".");
    }
    /* eslint-disable-next-line guard-for-in */
    for (var key in _template) {
        if (typeof key != 'string')
            throw new Error("invalid key of " + key + ".");
        if (key == 'hue') {
            /* eslint-disable-next-line max-len */
            hsvColor.h = prng_1.prng.randomInRange(_template[key].min, _template[key].max);
            hsvColor.h = hsvColor.h > 360 ? hsvColor.h % 360 : hsvColor.h;
            hsvColor.h = hsvColor.h < 0 ? 0 : hsvColor.h;
        }
        if (key == 'saturation') {
            hsvColor.s = prng_1.prng.randomInRange(_template[key].min, _template[key].max); /* eslint-disable-line max-len */
            hsvColor.s = hsvColor.s > 100 ? 100 : hsvColor.s;
            hsvColor.s = hsvColor.s < 0 ? 0 : hsvColor.s;
        }
        if (key == 'value') {
            hsvColor.v = prng_1.prng.randomInRange(_template[key].min, _template[key].max); /* eslint-disable-line max-len */
            hsvColor.v = hsvColor.v > 100 ? 100 : hsvColor.v;
            hsvColor.v = hsvColor.v < 0 ? 0 : hsvColor.v;
        }
    }
    return hsvColor;
};
exports.colorGenerator = {
    randomColor: exports.randomColor,
    prng: prng_1.prng,
    applyColorTemplate: applyColorTemplate,
};
