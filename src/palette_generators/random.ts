import { colorGenerator } from '../color_generator';

function generatePalette(hsvColor = null, n = 5, options = {}) {
    const defaults = {}
    let _options = { ...defaults, ...options };

    if (hsvColor != null && !(['h', 's', 'v'].every((k) => hsvColor.hasOwnProperty(k)))) {
        throw new Error(`invalid hsvColor of ${hsvColor}.`);
    }

    if (hsvColor != null 
        && (   
            typeof hsvColor.h != 'number' ||
            typeof hsvColor.s != 'number' ||
            typeof hsvColor.v != 'number'
        )) {
            throw new Error(`invalid hsvColor of ${hsvColor}.`);
        }

    if (typeof n != 'number') throw new Error(`invalid type for n: ${n}.`);
    let _palette = []

    if (hsvColor != null) {
        _palette.push(hsvColor);
    } else {
        hsvColor = colorGenerator.randomColor(_options);
        _palette.push(hsvColor);
    }

    for (var i = 0; i < n - 1; i++) {
        let color = colorGenerator.randomColor(_options);
        _palette.push(color);
    }

    return _palette;
}

export const random = { generatePalette, colorGenerator }