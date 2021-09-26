import { paletteGenerators } from '../src/palette_generators';
import { expect } from 'chai';

describe("paletteGenerators/random", () => {
    beforeEach(() => {
        paletteGenerators.random.colorGenerator.prng.setSeed(null);
    });

    it("should generate deterministic random palette given seed is set", () => {
        let expected = [
            { h: 26.04497581813272, s: 67.38630535841315, v: 51.82355967078189 },
            { h: 155.98013163089144, s: 76.21496124518372, v: 95.45696159122085 },
            { h: 273.3807796606291, s: 41.38311473081112, v: 90.5306927297668 },
            { h: 57.929866078631754, s: 33.84021767816029, v: 47.10519547325103 },
            { h: 348.87103337359434, s: 79.04859643210898, v: 83.95833333333333 }
        ];
    
        paletteGenerators.random.colorGenerator.prng.setSeed(1337);

        let colorPalette = paletteGenerators.random.generatePalette();
        expect(colorPalette).to.be.deep.eq(expected);
    });

    it("should generate deterministic random palette given seed is reset", () => {
        let expected = [
            { h: 26.04497581813272, s: 67.38630535841315, v: 51.82355967078189 },
            { h: 155.98013163089144, s: 76.21496124518372, v: 95.45696159122085 },
            { h: 273.3807796606291, s: 41.38311473081112, v: 90.5306927297668 },
            { h: 57.929866078631754, s: 33.84021767816029, v: 47.10519547325103 },
            { h: 348.87103337359434, s: 79.04859643210898, v: 83.95833333333333 }
        ];
        
        let colorPalette_0 = paletteGenerators.random.generatePalette();
        paletteGenerators.random.colorGenerator.prng.setSeed(1337);

        let colorPalette = paletteGenerators.random.generatePalette();

        expect(colorPalette).to.be.not.deep.eq(colorPalette_0);
        expect(colorPalette).to.be.deep.eq(expected);
    });

    it("should generate deterministic random palette given seed is set", () => {
        let expected = [
            { h: 26.04497581813272, s: 67.38630535841315, v: 51.82355967078189 },
            { h: 155.98013163089144, s: 76.21496124518372, v: 95.45696159122085 },
            { h: 273.3807796606291, s: 41.38311473081112, v: 90.5306927297668 },
            { h: 57.929866078631754, s: 33.84021767816029, v: 47.10519547325103 },
            { h: 348.87103337359434, s: 79.04859643210898, v: 83.95833333333333 }
        ];
    
        paletteGenerators.random.colorGenerator.prng.setSeed(1337);

        let colorPalette = paletteGenerators.random.generatePalette();
        expect(colorPalette).to.be.deep.eq(expected);
    });

    it("should fail if hsvColor is not null, but has invalid structure", () => {
        expect(() => paletteGenerators.random.generatePalette({starting_color: {h: 'as', s: 123, v: 234}})).to.be.throw(Error, 'invalid hsvColor');
        expect(() => paletteGenerators.random.generatePalette({starting_color: {g: 123, v: 234}})).to.be.throw(Error, 'invalid hsvColor');
    });

    it("should contains hsvColor is hsvColor parameter is passed", () => {
        let color = { h: 57.929866078631754, s: 33.84021767816029, v: 47.10519547325103 }
        let colorPalette = paletteGenerators.random.generatePalette({starting_color: color});
        expect(colorPalette).to.contain(color);
    });
});