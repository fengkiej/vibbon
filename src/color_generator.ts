import * as templates from './templates.json';
import {prng} from './prng';
import {utils} from './utils';

export const randomColor = (options = {}) => {
  const defaults = {
    lock: {
      hue: null,
      saturation: null,
      value: null,
    },
    template: null,
  };
  const _options = {...defaults, ...options};

  // use RGB to generate random color: https://medialab.github.io/iwanthue/theory/
  const r = prng.randomInRange(0, 255);
  const g = prng.randomInRange(0, 255);
  const b = prng.randomInRange(0, 255);

  let hsvColor = utils.RGBToHSV(r, g, b); /* eslint-disable-line new-cap */

  if (_options.template != null) {
    hsvColor = applyColorTemplate(hsvColor, _options.template);
  }

  if (_options.lock.hue != null) {
    // eslint-disable-next-line max-len
    hsvColor.h = _options.lock.hue;
    hsvColor.h = hsvColor.h > 360? hsvColor.h % 360 : hsvColor.h;
    hsvColor.h = hsvColor.h < 0? 360 + (hsvColor.h % 360) : hsvColor.h;
  }
  if (_options.lock.saturation != null) {
    hsvColor.s = _options.lock.saturation;
    hsvColor.s = hsvColor.s > 100? 100 : hsvColor.s;
    hsvColor.s = hsvColor.s < 0? 0 : hsvColor.s;
  }
  if (_options.lock.value != null) {
    hsvColor.v = _options.lock.value;
    hsvColor.v = hsvColor.v > 100? 100 : hsvColor.v;
    hsvColor.v = hsvColor.v < 0? 0 : hsvColor.v;
  }

  return hsvColor;
};

const applyColorTemplate = (hsvColor, templateName) => {
  if (!(['h', 's', 'v'].every((k) => hsvColor.hasOwnProperty(k)))) {
    throw new Error(`invalid hsvColor of ${hsvColor}.`);
  }

  // eslint-disable-next-line max-len
  if (typeof hsvColor.h != 'number' || typeof hsvColor.s != 'number' || typeof hsvColor.v != 'number') {
    throw new Error(`invalid hsvColor of ${hsvColor}.`);
  }

  if (typeof templateName != 'string') {
    throw new Error(`invalid parameter, templateName: ${templateName}.`);
  }

  if (templateName == null) return hsvColor;

  const _template = templates.color[templateName];

  if (_template == null) {
    throw new Error(`invalid template name of ${templateName}.`);
  }

  /* eslint-disable-next-line guard-for-in */
  for (const key in _template) {
    if (typeof key != 'string') throw new Error(`invalid key of ${key}.`);
    if (key == 'hue') {
      /* eslint-disable-next-line max-len */
      hsvColor.h = prng.randomInRange(_template[key].min, _template[key].max);
      hsvColor.h = hsvColor.h > 360? hsvColor.h % 360 : hsvColor.h;
      hsvColor.h = hsvColor.h < 360 + (hsvColor.h % 360)? 0 : hsvColor.h;
    }
    if (key == 'saturation') {
      hsvColor.s = prng.randomInRange(_template[key].min, _template[key].max); /* eslint-disable-line max-len */
      hsvColor.s = hsvColor.s > 100? 100 : hsvColor.s;
      hsvColor.s = hsvColor.s < 0? 0 : hsvColor.s;
    }
    if (key == 'value') {
      hsvColor.v = prng.randomInRange(_template[key].min, _template[key].max); /* eslint-disable-line max-len */
      hsvColor.v = hsvColor.v > 100? 100 : hsvColor.v;
      hsvColor.v = hsvColor.v < 0? 0 : hsvColor.v;
    }
  }

  return hsvColor;
};

export const colorGenerator = {
  randomColor, prng, applyColorTemplate,
};
