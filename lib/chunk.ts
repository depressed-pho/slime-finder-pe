import MersenneTwister = require('mersenne-twister');
import Point from 'slime-finder/point';
import { umul32_lo, umul32_hi } from 'slime-finder/umul32';

export default class Chunk {
    /* Origin of the chunk (normalized, i.e. always multiple of 16 */
    readonly origin: Point;

    /* Construct a Chunk object which contains the given point. */
    constructor(origin: Point) {
        this.origin = new Point(
            Math.floor(origin.x / 16) * 16,
            Math.floor(origin.z / 16) * 16);
    }

    /* Return a new chunk offset by given number of chunks */
    offset(x: number, z: number): Chunk {
        return new Chunk(new Point(
            this.origin.x + x * 16,
            this.origin.z + z * 16));
    }

    /* Return true if it is a slime chunk. */
    get isSlimy(): boolean {
        /* MCPE slime-chunk checker; reverse engineered by @protolambda and @jocopa3
         * Ported by PHO from Java code:
         *   https://gist.github.com/protolambda/00b85bf34a75fd8176342b1ad28bfccc
         */
        let x_uint    = (this.origin.x / 16) >>> 0;
        let z_uint    = (this.origin.z / 16) >>> 0;
        let seed      = umul32_lo(x_uint, 0x1f1f1f1f) ^ z_uint;
        let mt        = new MersenneTwister(seed);
        let n         = mt.random_int();
        let m         = 0xcccccccd;
        let hi        = umul32_hi(n, m);
        let hi_shift3 = hi >>> 3;
        let res       = ((((hi_shift3 + (hi_shift3 * 4)) & 0xffffffff) * 2) & 0xffffffff) >>> 0;
        return n == res;
    }
}
