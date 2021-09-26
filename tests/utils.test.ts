import { utils } from '../src/utils';
import { expect } from 'chai';

describe("Utils", () => {
    let rgb_0 = {
        r: 230.71,
        g: 118.78,
        b: 240.01
    }

    let hsv_0 = {
        h: 295.4,
        s: 50.51,
        v: 94.12
    }

    it("should convert RGB to HSV", () => {
        let hsv_1 = utils.RGBToHSV(rgb_0.r, rgb_0.g, rgb_0.b);

        expect(hsv_1.h).to.be.closeTo(hsv_0.h, 0.1);
        expect(hsv_1.s).to.be.closeTo(hsv_0.s, 0.1);
        expect(hsv_1.v).to.be.closeTo(hsv_0.v, 0.1);
    });

    it("should convert HSV to RGB", () => {
        let rgb_1 = utils.HSVToRGB(hsv_0.h, hsv_0.s, hsv_0.v);

        expect(rgb_1.r).to.be.closeTo(rgb_0.r, 0.1);
        expect(rgb_1.g).to.be.closeTo(rgb_0.g, 0.1);
        expect(rgb_1.b).to.be.closeTo(rgb_0.b, 0.1);
    });

    it("should fail if parameters are NaN for RGB to HSV", () => {
        expect(() => utils.RGBToHSV('rgb_0.r', rgb_0.g, rgb_0.b)).to.throw(Error, `invalid parameter: rgb(${'rgb_0.r'}, ${rgb_0.g}, ${rgb_0.b})`);
        expect(() => utils.RGBToHSV(rgb_0.r, 'rgb_0.g', rgb_0.b)).to.throw(Error, `invalid parameter: rgb(${rgb_0.r}, ${'rgb_0.g'}, ${rgb_0.b})`);
        expect(() => utils.RGBToHSV(rgb_0.r, rgb_0.g, 'rgb_0.b')).to.throw(Error, `invalid parameter: rgb(${rgb_0.r}, ${rgb_0.g}, ${'rgb_0.b'})`);
        expect(() => utils.RGBToHSV('rgb_0.r', 'rgb_0.g', 'rgb_0.b')).to.throw(Error, `invalid parameter: rgb(${'rgb_0.r'}, ${'rgb_0.g'}, ${'rgb_0.b'})`);
    });

    it("should fail if parameters are NaN for RGB to HSV", () => {
        expect(() => utils.HSVToRGB('hsv_0.h', hsv_0.s, hsv_0.v)).to.throw(Error, `invalid parameter: hsv(${'hsv_0.h'}, ${hsv_0.s}, ${hsv_0.v})`);
        expect(() => utils.HSVToRGB(hsv_0.h, 'hsv_0.s', hsv_0.v)).to.throw(Error, `invalid parameter: hsv(${hsv_0.h}, ${'hsv_0.s'}, ${hsv_0.v})`);
        expect(() => utils.HSVToRGB(hsv_0.h, hsv_0.s, 'hsv_0.v')).to.throw(Error, `invalid parameter: hsv(${hsv_0.h}, ${hsv_0.s}, ${'hsv_0.v'})`);
        expect(() => utils.HSVToRGB('hsv_0.h', 'hsv_0.s', 'hsv_0.v')).to.throw(Error, `invalid parameter: hsv(${'hsv_0.h'}, ${'hsv_0.s'}, ${'hsv_0.v'})`);
    });
});