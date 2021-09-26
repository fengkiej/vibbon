// method from: https://designerup.co/blog/practical-guide-to-perfect-ui-color-palettes/ | https://www.youtube.com/watch?v=GyVMoejbGFg&t=1007s
import templates = require('../templates.json');
import { colorGenerator } from '../color_generator';
import { prng } from '../prng';

function generatePalette(hsvColor = null, n = 5, options = {}) {
    const defaults = {
        template: null
    }
    let _options = { ...defaults, ...options };

    if (typeof n != 'number') throw new Error(`invalid type for n: ${n}.`);

    let _palette = []

    if (hsvColor != null) {
        _palette.push(hsvColor);
    } else {
        if (_options.template == null) {
            let randomTemplateIndex = prng.randomInRange(0, Object.keys(templates.color).length);
            _options.template = templates[randomTemplateIndex];
        }

        hsvColor = colorGenerator.randomColor(_options);
        _palette.push(hsvColor);
    }

    for (var i = 0; i < n - 1; i++) {
        let color = colorGenerator.randomColor({
            lock: {
                saturation: hsvColor.s,
                value: hsvColor.v
            }
        });
        _palette.push(color);
    }

    return _palette;
}

export const alli = { generatePalette }