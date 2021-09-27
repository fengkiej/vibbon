"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paletteGenerators = void 0;
var random_1 = require("./random");
var alli_1 = require("./alli");
var maulina_1 = require("./maulina");
// TODO: refactor common lines in generatePalette (e.g. initial color creation if null, apply harmony)
exports.paletteGenerators = {
    random: random_1.random,
    alli: alli_1.alli,
    maulina: maulina_1.maulina
};
