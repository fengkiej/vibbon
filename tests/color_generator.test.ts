import { colorGenerator } from '../src/color_generator';
import { expect, assert } from 'chai';
import sinon from 'sinon';

describe("colorGenerator", () => {
    beforeEach(() => {
        colorGenerator.prng.setSeed(null);
    });

    let invalid_params_applyColorTemplate =
    [
        ["string", "neutral"],
        [{h: 222, s: 19, v: 45}, 1223],
        [{h: 222}, 123],
        [{s: 55}, "neutral"],
        ["string", []],
        [{h: 222, s:23, v: []}, "neutral"],
        [{h: 222, s:23, v: []}, "nonexistent"]
    ]

    invalid_params_applyColorTemplate.forEach(([param_0, param_1]) => {
        it(`should fail if applyColorTemplate has incorrect type for parameters: ${param_0} ${param_1}`, () => {
            let hsvColor;
            let templateName;
    
            hsvColor = [];
            templateName = 'neutral';
    
            expect(() => colorGenerator.applyColorTemplate(param_0, param_1)).to.throw(Error, 'invalid');
        });
    });

    it("should not exceeds hsv max values if max is out of range.", () => {
        sinon.stub(colorGenerator.prng, "randomInRange").returns(420);
        let applied_h = colorGenerator.applyColorTemplate({
            "h": 44,
            "s": 55,
            "v": 89
        }, "warm");
        let applied_sv = colorGenerator.applyColorTemplate({
            "h": 44,
            "s": 55,
            "v": 89
        }, "neutral");
        sinon.restore();

        expect(applied_h.h).to.lt(360);
        expect(applied_sv.s).to.lte(100);
        expect(applied_sv.v).to.lte(100);
    });

    it("should not negative if min is defined as a negative number", () => {
        sinon.stub(colorGenerator.prng, "randomInRange").returns(-420);
        let applied_h = colorGenerator.applyColorTemplate({
            "h": 44,
            "s": 55,
            "v": 89
        }, "warm");
        let applied_sv = colorGenerator.applyColorTemplate({
            "h": 44,
            "s": 55,
            "v": 89
        }, "neutral");
        sinon.restore();

        expect(applied_h.h).to.gte(0);
        expect(applied_sv.s).to.gte(0);
        expect(applied_sv.v).to.gte(0);
    });

    it("should generate random color if seed is not defined", () => {
        let color = colorGenerator.randomColor();

        expect(color).to.be.not.eq(null);
        assert((['h', 's', 'v'].every((k) => color.hasOwnProperty(k))))
    });

    it("should generate deterministic result if seed is defined", () => {
        colorGenerator.prng.setSeed(1337);
        let color = colorGenerator.randomColor();
 
        expect(color).to.be.deep.eq({ h: 26.04497581813272, s: 67.38630535841315, v: 51.82355967078189 });
    });

    it("should generate deterministic result if seed is redefined", () => {
        let color_0 = colorGenerator.randomColor();

        colorGenerator.prng.setSeed(1337);
        let color_1 = colorGenerator.randomColor();
        let color_2 = colorGenerator.randomColor();
    
        colorGenerator.prng.setSeed(1337);
        let color_3 = colorGenerator.randomColor();

        expect(color_0).to.not.be.deep.eq(color_1);
        expect(color_0).to.not.be.deep.eq(color_2);

        expect(color_2).to.not.be.deep.eq(color_1);

        expect(color_1).to.be.deep.eq(color_3);
    });

    let out_of_bound_locks = [
        { lock: {
            hue: 420,
            saturation: 120,
            value: 120
        }},
        { lock: {
            hue: -420,
            saturation: -120,
            value: -120
        }}
    ]

    let expected_lock_results = [
        {
            h: 60,
            s: 100,
            v: 100
        },
        {
            h: 0,
            s: 0,
            v: 0
        }
    ]

    out_of_bound_locks.forEach((opt, i) => {
        it(`test for out of hsv bound option locks: ${opt}`, () => {
            let color = colorGenerator.randomColor(opt);

            expect(color).to.be.deep.eq(expected_lock_results[i]);
        });
    })

});