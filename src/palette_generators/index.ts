import { random } from './random';
import { alli } from './alli';
import { maulina } from './maulina';

// TODO: refactor common lines in generatePalette (e.g. initial color creation if null, apply harmony)
export const paletteGenerators = {
    random, alli, maulina
}