export declare const colorHarmony: {
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
    addHarmonyToPalette: (palette: any, harmonyType: any) => any;
};
