/*
 * Type definitions for mersennetwister 0.2.3
 * Project: https://github.com/pigulla/mersennetwister
 * Definitions by: PHO <https://github.com/depressed-pho>
 */

export = MersenneTwister;

declare class MersenneTwister {
    static random(): number;

    constructor(seed?: number);

    seed(seed: number): void;
    seedArray(vector: number[]): void;

    int(): number;
    int31(): number;
    real(): number;
    realx(): number;
    rnd(): number;
    random(): number;
    rndHiRes(): number;
}
