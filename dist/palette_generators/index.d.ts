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
            };
            applyColorTemplate: (hsvColor: any, templateName: any) => any;
        };
    };
    alli: {
        generatePalette: (options?: {}) => any[];
    };
    maulina: {
        generatePalette: (options?: {}) => any;
    };
};
