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

const _generateMonochromaticPalette = (hsvColor, n = 5, options = {}) => {}

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

    for (var i = mid - 1; i >= 0; i--) {
        let hueShift = randomInRange(hueShiftMin, hueShiftMax);
        let saturationShift = randomInRange(saturationShiftMin, saturationShiftMax);
        let valueShift = randomInRange(valueShiftMin, valueShiftMax);
        let prevColor = _palette[i + 1];
        let nextColor;
        // TODO: handle for negatives
        if (direction == 0) {
            nextColor = {
                h: (prevColor.h + hueShift) % 360,
                s: (prevColor.s - saturationShift) > 100? 100: (prevColor.s - saturationShift),
                v: (prevColor.v - valueShift) > 100? 100 : (prevColor.v - valueShift)
            };
        }

        if (direction == 1) {
            nextColor = {
                h: (prevColor.h - hueShift) % 360,
                s: (prevColor.s - saturationShift) > 100? 100: (prevColor.s - saturationShift),
                v: (prevColor.v - valueShift) > 100? 100 : (prevColor.v - valueShift)
            };
        }

        _palette[i] = nextColor;
    }

    for (var i = mid + 1; i < n; i++) {
        let hueShift = randomInRange(hueShiftMin, hueShiftMax);
        let saturationShift = randomInRange(saturationShiftMin, saturationShiftMax);
        let valueShift = randomInRange(valueShiftMin, valueShiftMax);
        let prevColor = _palette[i - 1];
        let nextColor;
        if (direction == 0) {
            nextColor = {
                h: (prevColor.h - hueShift) % 360,
                s: (prevColor.s - saturationShift) > 100? 100: (prevColor.s - saturationShift),
                v: (prevColor.v + valueShift) > 100? 100 : (prevColor.v + valueShift)
            };
        }

        if (direction == 1) {
            nextColor = {
                h: (prevColor.h + hueShift) % 360,
                s: (prevColor.s - saturationShift) > 100? 100: (prevColor.s - saturationShift),
                v: (prevColor.v + valueShift) > 100? 100 : (prevColor.v + valueShift)
            };
        }

        _palette[i] = nextColor;
    }

    return _palette;
}

export const maulina = { generatePalette }