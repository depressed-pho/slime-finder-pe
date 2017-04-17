import MersenneTwister = require('mersenne-twister');
import bigInt          = require('big-integer');
import Point from 'slime-finder/point';

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
        let seed      = bigInt(x_uint).multiply(0x1f1f1f1f).xor(z_uint).and(0xffffffff).valueOf();
        let mt        = new MersenneTwister(seed);
        let n         = bigInt(mt.random_int());
        let m         = bigInt(0xcccccccd);
        let product   = bigInt(n).multiply(m);
        let hi        = product.shiftRight(32).and(0xffffffff);
        let hi_shift3 = hi.shiftRight(3).and(0xffffffff);
        let res       = hi_shift3.multiply(4).add(hi_shift3).and(0xffffffff).multiply(2).and(0xffffffff);
        return n.equals(res);
    }
}
