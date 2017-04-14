export default class Chunk {
    /* Origin of the chunk (normalized, i.e. always multiple of 16 */
    readonly x: number;
    readonly z: number;

    /* Construct a Chunk object which contains the given point. */
    constructor(x: number, z: number) {
        this.x = Math.floor(x/16)*16;
        this.z = Math.floor(z/16)*16;
    }
}
