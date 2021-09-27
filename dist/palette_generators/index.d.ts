export declare const paletteGenerators: {
    random: {
        generatePalette: (options?: {}) => any[];
        colorGenerator: {
            randomColor: (options?: {}) => {
                h: number;
                s: number;
                v: number;
            };
            prng: {
                randomInRange: (min: any, max: any) => any;
                setSeed: (_seed: any) => void;
                getSeed: () => any;
                shuffle: ([...arr]: any[]) => any[];
            };
            applyColorTemplate: (hsvColor: any, templateName: any) => any;
        };
    };
    alli: {
        generatePalette: (options?: {}) => any[];
    };
    maulina: {
        generatePalette: (options?: {}) => any;
        getNextColorCombination: (hsvColor: any, shifts: any) => {
            0: {
                h: number;
                s: number;
                v: number;
            };
            1: {
                h: number;
                s: number;
                v: any;
            };
            2: {
                h: number;
                s: any;
                v: number;
            };
            3: {
                h: number;
                s: any;
                v: any;
            };
            4: {
                h: any;
                s: number;
                v: number;
            };
            5: {
                h: any;
                s: number;
                v: any;
            };
            6: {
                h: any;
                s: any;
                v: number;
            };
            7: {
                h: any;
                s: any;
                v: any;
            };
        };
    };
};
