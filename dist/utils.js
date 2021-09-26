"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
// https://www.30secondsofcode.org/js/s/rgb-to-hsb
var RGBToHSV = function (r, g, b) {
    if (typeof r != 'number' || typeof g != 'number' || typeof b != 'number') {
        throw new Error("invalid parameter: rgb(" + r + ", " + g + ", " + b + ")");
    }
    r /= 255;
    g /= 255;
    b /= 255;
    var v = Math.max(r, g, b);
    var n = v - Math.min(r, g, b);
    var h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n; // eslint-disable-line max-len
    return {
        h: 60 * (h < 0 ? h + 6 : h),
        s: v && (n / v) * 100,
        v: v * 100,
    };
};
// https://www.30secondsofcode.org/js/s/hsb-to-rgb
var HSVToRGB = function (h, s, v) {
    if (typeof h != 'number' || typeof s != 'number' || typeof v != 'number') {
        throw new Error("invalid parameter: hsv(" + h + ", " + s + ", " + v + ")");
    }
    s /= 100;
    v /= 100;
    var k = function (n) { return (n + h / 60) % 6; };
    var f = function (n) { return v * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1))); };
    return {
        r: 255 * f(5),
        g: 255 * f(3),
        b: 255 * f(1),
    };
};
exports.utils = {
    RGBToHSV: RGBToHSV,
    HSVToRGB: HSVToRGB,
};
