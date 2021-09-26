// method from: https://www.clipstudio.net/how-to-draw/archives/156922
import { randomColor } from '../color_generator';
import { randomInRange } from '../prng';
import { colorHarmony } from '../color_harmony';

function generatePalette(hsvColor = null, n = 5, options = {}) {
    const paletteTypes = [ "analogous", "analogousWithComplementaryAccent" ]
    const defaults = {
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
    }
    let _options = { ...defaults, ...options };

    if (typeof n != 'number') throw new Error(`invalid type for n: ${n}.`);
    if (_options.palette_type == null) _options.palette_type = "analogous"; // set default to "analogous"
    if (paletteTypes.indexOf(_options.palette_type) == -1) throw new Error(`invalid palette_type of ${_options.palette_type}`);

    if (hsvColor == null) {
        hsvColor = randomColor(_options);
    }

    let _palette;

    switch(_options.palette_type) {
        case "analogous":
            _palette = _generateAnalogousPalette(hsvColor, n, options);
            break;
        case "analogousWithComplementaryAccent":
            _palette = _generateAnalogousPalette(hsvColor, n, options);

            let replaceIndex = Math.floor(randomInRange(0, n));

            let harmonies = colorHarmony.getHarmonies(_palette[replaceIndex]);

            _palette[replaceIndex] = harmonies.complementary[1];

            break;
        default:
            _palette = _generateAnalogousPalette(hsvColor, n, options);
            break;
    }

    return _palette;
}

const _generateMonochromaticPalette = (hsvColor, n = 5, options = {}) => {
    const defaults = {
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
    }
    let _options = { ...defaults, ...options };

    let _palette = [];
    let direction = Math.round(randomInRange(0, 1)); // 0: shift hue to left (warmer light), 1: shift hue to right (cooler shadow)
    
    let hueShiftMin = _options.palette_type_config.analogous.hue_shift.min;
    let hueShiftMax = _options.palette_type_config.analogous.hue_shift.max;

    let saturationShiftMin = _options.palette_type_config.analogous.saturation_shift.min;
    let saturationShiftMax = _options.palette_type_config.analogous.saturation_shift.max;

    let valueShiftMin = _options.palette_type_config.analogous.value_shift.min;
    let valueShiftMax = _options.palette_type_config.analogous.value_shift.max;

    let mid = Math.floor(n / 2);
    _palette[mid] = hsvColor;

    for (let i = mid - 1; i >= 0; i--) {
        let saturationShift = randomInRange(saturationShiftMin, saturationShiftMax);
        let valueShift = randomInRange(valueShiftMin, valueShiftMax);
        let prevColor = _palette[i + 1];
        let nextColorCombination = getNextColorCombination(prevColor, {h: 0, s: saturationShift, v: valueShift});

        let nextColor = direction == 0? nextColorCombination[4] : nextColorCombination[0];

        _palette[i] = nextColor;
    }

    for (let i = mid + 1; i < n; i++) {
        let saturationShift = randomInRange(saturationShiftMin, saturationShiftMax);
        let valueShift = randomInRange(valueShiftMin, valueShiftMax);
        let prevColor = _palette[i - 1];
        let nextColorCombination = getNextColorCombination(prevColor, {h: 0, s: saturationShift, v: valueShift});

        let nextColor = direction == 0? nextColorCombination[1] : nextColorCombination[5];

        _palette[i] = nextColor;
    }

    return _palette;
}

const _generateAnalogousPalette = (hsvColor, n = 5, options = {}) => {
    const defaults = {
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
    }
    let _options = { ...defaults, ...options };

    let _palette = [];
    let direction = Math.round(randomInRange(0, 1)); // 0: shift hue to left (warmer light), 1: shift hue to right (cooler shadow)
    
    let hueShiftMin = _options.palette_type_config.analogous.hue_shift.min;
    let hueShiftMax = _options.palette_type_config.analogous.hue_shift.max;

    let saturationShiftMin = _options.palette_type_config.analogous.saturation_shift.min;
    let saturationShiftMax = _options.palette_type_config.analogous.saturation_shift.max;

    let valueShiftMin = _options.palette_type_config.analogous.value_shift.min;
    let valueShiftMax = _options.palette_type_config.analogous.value_shift.max;

    let mid = Math.floor(n / 2);
    _palette[mid] = hsvColor;

    for (let i = mid - 1; i >= 0; i--) {
        let hueShift = randomInRange(hueShiftMin, hueShiftMax);
        let saturationShift = randomInRange(saturationShiftMin, saturationShiftMax);
        let valueShift = randomInRange(valueShiftMin, valueShiftMax);
        let prevColor = _palette[i + 1];
        let nextColorCombination = getNextColorCombination(prevColor, {h: hueShift, s: saturationShift, v: valueShift});

        let nextColor = direction == 0? nextColorCombination[4] : nextColorCombination[0];

        _palette[i] = nextColor;
    }

    for (let i = mid + 1; i < n; i++) {
        let hueShift = randomInRange(hueShiftMin, hueShiftMax);
        let saturationShift = randomInRange(saturationShiftMin, saturationShiftMax);
        let valueShift = randomInRange(valueShiftMin, valueShiftMax);
        let prevColor = _palette[i - 1];
        let nextColorCombination = getNextColorCombination(prevColor, {h: hueShift, s: saturationShift, v: valueShift});

        let nextColor = direction == 0? nextColorCombination[1] : nextColorCombination[5];

        _palette[i] = nextColor;
    }

    return _palette;
}

const getNextColorCombination = (hsvColor, shifts, options = {}) => {
    const defaults = {
        lock: {
          hue: null,
          saturation: null,
          value: null,
        }
      };
    const _options = {...defaults, ...options};

    let hue_0 = hsvColor.h - shifts.h;
    hue_0 = hue_0 > 360? hue_0 % 360 : hue_0;
    hue_0 = hue_0 < 0? 360 + (hue_0 % 360) : hue_0;
    
    let saturation_0 = hsvColor.s - shifts.s;
    saturation_0 = saturation_0 > 100? 100 : saturation_0;
    saturation_0 = saturation_0 < 0? 0 : saturation_0;

    let value_0 = hsvColor.v - shifts.v;
    value_0 = value_0 > 100? 100 : value_0;
    value_0 = value_0 < 0? 0 : value_0;

    let hue_1 = hsvColor.h + shifts.h;
    hue_1 = hue_1 > 360? hue_1 % 360 : hue_0;
    hue_1 = hue_1 < 0? 360 + (hue_1 % 360) : hue_0;

    let saturation_1 = hsvColor.s + shifts.s;
    saturation_1 = saturation_1 > 100? 100 : saturation_1;
    saturation_1 = saturation_1 < 0? 0 : saturation_1;

    let value_1 = hsvColor.v + shifts.v;
    value_1 = value_1 > 100? 100 : value_1;
    value_1 = value_1 < 0? 0 : value_1;

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
    }
}

export const maulina = { generatePalette }