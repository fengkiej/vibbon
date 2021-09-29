# Vibbon: Colors and palette generator library

![vibbon_logo](./assets/Vibbon-logos_long.jpeg)

## Installation
Run this command:
```bash
npm i vibbon
```

## How to use
With `require`:
```js
const { Vibbon } = require('vibbon');
```

With `import`:
```js
import { Vibbon } from 'vibbon';
```

### Generate Random Color
`Vibbon.randomColor(options?)`

Example:
```js
const { Vibbon } = require('vibbon');

const color = Vibbon.randomColor();
console.log(color); 
/* sample output: {
    h: 115.69746830800827, 
    s: 83.63203255191029, 
    v: 41.92944101508916 } */

const options = {
    lock: { // lock hue, value, or saturation color during generation
      hue: 342, // values: [0 - 359]
      saturation: 3, // values: [0 - 100]
      value: 43, // values: [0 - 100]
    },
    template: 'pastel', // use a template from available templates -- see templates.json --
  };


const color_0 = Vibbon.randomColor({
    lock: { hue: 350 } // generate random color with hue locked at 350 (reddish color)
});
console.log(color_0);
/* sample output: { h: 350, s: 81.75131655637338, v: 83.10913923182441 } */
```

Color templates are predefined set of generation ranges. The definitions are taken from https://designerup.co/blog/practical-guide-to-perfect-ui-color-palettes.
Available templates:
```
{
  "color": {
    "neutral": {
      "saturation": {
        "min": 1,
        "max": 10
      },
      "value": {
        "min": 70,
        "max": 99
      }
    },
    "jewel": {
      "saturation": {
        "min": 73,
        "max": 83
      },
      "value": {
        "min": 56,
        "max": 76
      }
    },
    "pastel": {
      "saturation": {
        "min": 14,
        "max": 21
      },
      "value": {
        "min": 89,
        "max": 96
      }
    },
    "earth": {
      "saturation": {
        "min": 36,
        "max": 41
      },
      "value": {
        "min": 36,
        "max": 77
      }
    },
    "fluorescent": {
      "saturation": {
        "min": 63,
        "max": 100
      },
      "value": {
        "min": 82,
        "max": 100
      }
    },
    "shades": {
      "saturation": {
        "min": 0,
        "max": 0
      },
      "value": {
        "min": 0,
        "max": 100
      }
    },
    "warm": {
      "hue": {
        "min": 270,
        "max": 450
      }
    },
    "cool": {
      "hue": {
        "min": 90,
        "max": 270
      }
    }
  }
}
```

### Generate Random Palette
`Vibbon.randomPalette(method, options?)`
```js
const { Vibbon } = require('vibbon');

const palette = Vibbon.randomPalette();
console.log(palette); 
/* sample output: 
[
  { h: 49.4549164735586, s: 68.47284223987874, v: 36.20156035665295 },
  { h: 67.85997148740695, s: 37.048319720015584, v: 80.34936556927298 },
  {
    h: 293.87231346042137,
    s: 10.353348969694988,
    v: 78.40663580246914
  },
  { h: 9.09385609882416, s: 55.00886337736885, v: 81.2517146776406 },
  {
    h: 220.82703677494465,
    s: 56.311178810841376,
    v: 66.69624485596708
  }
] */
```

By default it will generate `5` random colors without constraints (random selection of colors), but we can specify `method` and `options` to generate palette of colors with a specified set of rules.

_To be added_: Valid parameters for `method` & `options`.

### Color Harmony
`Vibbon.getHarmonies(hsvColor)`
```js
const { Vibbon } = require('vibbon');

const color = {
    h: 115.69746830800827, 
    s: 83.63203255191029, 
    v: 41.92944101508916 
}

const harmonies = Vibbon.getHarmonies(color);
console.log(harmonies); 
/* sample output: 
{
    "complementary": ...arrayOfColors,
    "splitComplementary": ...arrayOfColors,
    "splitComplementaryCW": ...arrayOfColors,
    "splitComplementaryCCW": ...arrayOfColors,
    "triadic": ...arrayOfColors,
    "clash": ...arrayOfColors,
    "tetradic": ...arrayOfColors,
    "fourToneCW": ...arrayOfColors,
    "fourToneCCW": ...arrayOfColors,
    "fiveToneA": ...arrayOfColors,
    "fiveToneB": ...arrayOfColors,
    "fiveToneC": ...arrayOfColors,
    "fiveToneD": ...arrayOfColors,
    "fiveToneE": ...arrayOfColors,
    "sixToneCW": ...arrayOfColors,
    "sixToneCCW": ...arrayOfColors,
    "neutral": ...arrayOfColors,
    "analogous": ...arrayOfColors,
}
 */
```

### Setting Seed for Repeatable Random Generation
`Vibbon.setSeed(seed)`
```js
const { Vibbon } = require('.');

Vibbon.setSeed(1337);
const color_0 = Vibbon.randomColor();

Vibbon.setSeed(null);
const color_1 = Vibbon.randomColor();

Vibbon.setSeed(1337);
const color_2 = Vibbon.randomColor();

console.log(color_0);
console.log(color_1);
console.log(color_2);

// color_0 == color_2; color_1 != color_2
```

## Maintainer
- @fengkiej (fengkiejunis@gmail.com)

## Contributing
To be added.

## License
Distributed under the MIT License. See `LICENSE.md` for more information.