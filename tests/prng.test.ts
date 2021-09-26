import { prng } from '../src/prng';
import { expect } from 'chai';

describe("prng", () => {
    beforeEach(() => {
        prng.setSeed(null);
    });

    it("should be null if seed is not initialized", () => {
        expect(prng.getSeed()).to.be.equal(null);
    });

    it("should be able to set prng seed", () => {
        let seed = 123;
        prng.setSeed(seed);

        expect(prng.getSeed()).to.be.equal(seed);
    });

    it("should fail if seed is NaN", () => {
        let seed = {};

        expect(() => prng.setSeed(seed)).to.throw(Error, `invalid parameter of ${seed}.`)
    });

    it("should give a seed if prng.seed is null but call randomInRange", () => {
        prng.randomInRange(1, 100);
        expect(prng.getSeed()).to.be.not.equal(null);
    });

    it.skip("should generate uniform random", () => {
        // TODO: add test for random statistic properties
    });

    it("should generate random where min <= generated_random < max in 10.000x trials", () => {
        let min = -0.534234;
        let max = 0.531212

        for (var i = 0; i < 10000; i++) {
            let randomNumber = prng.randomInRange(min, max);
            
            expect(randomNumber).to.be.gte(min);
            expect(randomNumber).to.be.lt(max);
            expect(randomNumber).to.be.not.equal(max);
        }
    });

    it("should be able to generate negative numbers", () => {
        let min = -0.534234;
        let max = -0.131212;

        let randomNumber = prng.randomInRange(min, max);
        
        expect(randomNumber).to.be.gte(min);
        expect(randomNumber).to.be.lt(max);
        expect(randomNumber).to.be.not.equal(max);
    });

    it("should be able to generate negative numbers", () => {
        let min = -0.534234;
        let max = -0.131212;

        let randomNumber = prng.randomInRange(min, max);
        
        expect(randomNumber).to.be.gte(min);
        expect(randomNumber).to.be.lt(max);
        expect(randomNumber).to.be.not.equal(max);
    });

    it("should generate deterministic results given same seed and range", () => {
        let seed = 1337;
        prng.setSeed(seed);

        let random_1 = prng.randomInRange(0, 1500);
        let random_2 = prng.randomInRange(0, 100);
        prng.setSeed(seed + 10);
        let random_3 = prng.randomInRange(0, 1500);

        prng.setSeed(seed);
        let random_4 = prng.randomInRange(0, 1500);
        let random_5 = prng.randomInRange(0, 100);

        expect(random_1).to.be.equal(random_4);
        expect(random_2).to.be.equal(random_5);
        expect(random_3).to.be.not.equal(random_1);
    });

    it("should fail if min > max", () => {
        let min;
        let max;

        min = 10; max = 1;
        expect(() => prng.randomInRange(min, max)).to.throw(Error, `min: ${min} should be less than max: ${max}`);

        min = 1; max = -10;
        expect(() => prng.randomInRange(min, max)).to.throw(Error, `min: ${min} should be less than max: ${max}`);
    });

    it("should generate constant if min equal to max", () => {
        let min = 15;
        let max = 15;

        let randomNumber = prng.randomInRange(min, max);
        
        expect(randomNumber).to.be.equal(15);
    });

    it("should fail if parameter is invalid ", () => {
        let min;
        let max;

        min = {}; max = 15;
        expect(() => prng.randomInRange(min, max)).to.throw(Error, `invalid parameter: max: ${max}; min: ${min}`);

        min = -1; max = {};
        expect(() => prng.randomInRange(min, max)).to.throw(Error, `invalid parameter: max: ${max}; min: ${min}`);

        min = []; max = {};
        expect(() => prng.randomInRange(min, max)).to.throw(Error, `invalid parameter: max: ${max}; min: ${min}`);
    });
});