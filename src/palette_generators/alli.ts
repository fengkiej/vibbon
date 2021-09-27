// method from: https://designerup.co/blog/practical-guide-to-perfect-ui-color-palettes/ | https://www.youtube.com/watch?v=GyVMoejbGFg&t=1007s
import * as templates from '../templates.json';
import { colorGenerator } from '../color_generator';
import { prng } from '../prng';
import { colorHarmony } from '../color_harmony';

function generatePalette(options = {}) {
    const defaults = {
        starting_color: null,
        n: 5,
        template: null,
        with: null, // for options see '../harmonies.json'
    }
    let _options = { ...defaults, ...options };

    let hsvColor = _options.starting_color;
    let n = _options.n;

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

    for (let i = 0; i < n - 1; i++) {
        let color = colorGenerator.randomColor({
            lock: {
                saturation: hsvColor.s,
                value: hsvColor.v
            }
        });
        _palette.push(color);
    }

    if (_options.with != null) _palette = colorHarmony.addHarmonyToPalette(_palette, _options.with);

    return _palette;
}

export const alli = { generatePalette }