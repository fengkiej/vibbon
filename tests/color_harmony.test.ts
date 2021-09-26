import { colorHarmony } from '../src/color_harmony';
import { expect } from 'chai';

describe("colorHarmony", () => {
    const hsv_0 = {
        h: 359,
        s: 50,
        v: 40
    }

    const hsv_0_harmonies = {
        color: [ { h: 359, s: 50, v: 40 } ],
        complementary: [ { h: 359, s: 50, v: 40 }, { h: 179, s: 50, v: 40 } ],
        splitComplementary: [
          { h: 359, s: 50, v: 40 },
          { h: 149, s: 50, v: 40 },
          { h: 319, s: 50, v: 40 }
        ],
        splitComplementaryCW: [
          { h: 359, s: 50, v: 40 },
          { h: 149, s: 50, v: 40 },
          { h: 299, s: 50, v: 40 }
        ],
        splitComplementaryCCW: [
          { h: 359, s: 50, v: 40 },
          { h: 59, s: 50, v: 40 },
          { h: 209, s: 50, v: 40 }
        ],
        triadic: [
          { h: 359, s: 50, v: 40 },
          { h: 119, s: 50, v: 40 },
          { h: 239, s: 50, v: 40 }
        ],
        clash: [
          { h: 359, s: 50, v: 40 },
          { h: 89, s: 50, v: 40 },
          { h: 269, s: 50, v: 40 }
        ],
        tetradic: [
          { h: 359, s: 50, v: 40 },
          { h: 89, s: 50, v: 40 },
          { h: 179, s: 50, v: 40 },
          { h: 269, s: 50, v: 40 }
        ],
        fourToneCW: [
          { h: 359, s: 50, v: 40 },
          { h: 59, s: 50, v: 40 },
          { h: 179, s: 50, v: 40 },
          { h: 239, s: 50, v: 40 }
        ],
        fourToneCCW: [
          { h: 359, s: 50, v: 40 },
          { h: 119, s: 50, v: 40 },
          { h: 179, s: 50, v: 40 },
          { h: 299, s: 50, v: 40 }
        ],
        fiveToneA: [
          { h: 359, s: 50, v: 40 },
          { h: 114, s: 50, v: 40 },
          { h: 154, s: 50, v: 40 },
          { h: 204, s: 50, v: 40 },
          { h: 244, s: 50, v: 40 }
        ],
        fiveToneB: [
          { h: 359, s: 50, v: 40 },
          { h: 39, s: 50, v: 40 },
          { h: 89, s: 50, v: 40 },
          { h: 129, s: 50, v: 40 },
          { h: 244, s: 50, v: 40 }
        ],
        fiveToneC: [
          { h: 359, s: 50, v: 40 },
          { h: 49, s: 50, v: 40 },
          { h: 89, s: 50, v: 40 },
          { h: 204, s: 50, v: 40 },
          { h: 319, s: 50, v: 40 }
        ],
        fiveToneD: [
          { h: 359, s: 50, v: 40 },
          { h: 39, s: 50, v: 40 },
          { h: 154, s: 50, v: 40 },
          { h: 269, s: 50, v: 40 },
          { h: 309, s: 50, v: 40 }
        ],
        fiveToneE: [
          { h: 359, s: 50, v: 40 },
          { h: 114, s: 50, v: 40 },
          { h: 229, s: 50, v: 40 },
          { h: 269, s: 50, v: 40 },
          { h: 319, s: 50, v: 40 }
        ],
        sixToneCW: [
          { h: 359, s: 50, v: 40 },
          { h: 29, s: 50, v: 40 },
          { h: 119, s: 50, v: 40 },
          { h: 149, s: 50, v: 40 },
          { h: 239, s: 50, v: 40 },
          { h: 269, s: 50, v: 40 }
        ],
        sixToneCCW: [
          { h: 359, s: 50, v: 40 },
          { h: 89, s: 50, v: 40 },
          { h: 119, s: 50, v: 40 },
          { h: 209, s: 50, v: 40 },
          { h: 239, s: 50, v: 40 },
          { h: 329, s: 50, v: 40 }
        ],
        neutral: [
          { h: 359, s: 50, v: 40 },
          { h: 14, s: 50, v: 40 },
          { h: 29, s: 50, v: 40 },
          { h: 44, s: 50, v: 40 },
          { h: 59, s: 50, v: 40 },
          { h: 74, s: 50, v: 40 }
        ],
        analogous: [
          { h: 359, s: 50, v: 40 },
          { h: 29, s: 50, v: 40 },
          { h: 59, s: 50, v: 40 },
          { h: 89, s: 50, v: 40 },
          { h: 119, s: 50, v: 40 },
          { h: 149, s: 50, v: 40 }
        ]
    }

    it("should generate color harmonies given an HSV color", () => {
        let harmonies = colorHarmony.getHarmonies(hsv_0);
        
        expect(harmonies).to.be.deep.equal(hsv_0_harmonies);
    });

    it("should not exceeds 360 for h value", () => {
        let harmonies = colorHarmony.getHarmonies(hsv_0);
        
        for(let k in harmonies) {
            for(let c in harmonies[k]) {
                expect(harmonies[k][c].h).is.lt(360);
            }
        }
    });

    it("should throw error if parameter is invalid", () => {
        const invalidParameter_0 = [5];
        expect(() => colorHarmony.getHarmonies(invalidParameter_0)).to.throw(Error, `invalid hsvColor of ${invalidParameter_0}`);

        const invalidParameter_1 = {'h': 20};
        expect(() => colorHarmony.getHarmonies(invalidParameter_1)).to.throw(Error, `invalid hsvColor of ${invalidParameter_1}`);

        const invalidParameter_2 = {'h': [], 's': 5, 'v': 100};
        expect(() => colorHarmony.getHarmonies(invalidParameter_2)).to.throw(Error, `invalid hsvColor of ${invalidParameter_2}`);
    });
});