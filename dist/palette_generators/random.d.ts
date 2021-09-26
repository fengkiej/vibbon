declare function generatePalette(options?: {}): any[];
export declare const random: {
    generatePalette: typeof generatePalette;
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
export {};
