/*
 * Type definitions for mersenne-twister 1.1.0
 * Project: https://github.com/boo1ean/mersenne-twister
 * Definitions by: PHO <https://github.com/depressed-pho>
 */

export = MersenneTwister;

declare class MersenneTwister {
    constructor(seed?: number);

    init_seed(seed: number): void;
    init_by_array(init_key: number[], key_length: number): void;

    random_int(): number;
    random_int31(): number;
    random_incl(): number;
    random(): number;
    random_excl(): number;
    random_long(): number;
}
