export declare const Vibbon: {
    setSeed: (_seed: any) => void;
    getHarmonies: (hsvColor: any) => {
        color: any[];
        complementary: any[];
        splitComplementary: any[];
        splitComplementaryCW: any[];
        splitComplementaryCCW: any[];
        triadic: any[];
        clash: any[];
        tetradic: any[];
        fourToneCW: any[];
        fourToneCCW: any[];
        fiveToneA: any[];
        fiveToneB: any[];
        fiveToneC: any[];
        fiveToneD: any[];
        fiveToneE: any[];
        sixToneCW: any[];
        sixToneCCW: any[];
        neutral: any[];
        analogous: any[];
    };
    randomColor: (options?: {}) => {
        h: number;
        s: number;
        v: number;
    };
    randomPalette: (method?: string, options?: {}) => any;
    utils: {
        RGBToHSV: (r: any, g: any, b: any) => {
            h: number;
            s: number;
            v: number;
        };
        HSVToRGB: (h: any, s: any, v: any) => {
            r: number;
            g: number;
            b: number;
        };
    };
};
