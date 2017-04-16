export default class Point {
    readonly x: number;
    readonly z: number;

    constructor(x: number, z: number) {
        this.x = x;
        this.z = z;
    }

    offset(x: number, z: number): Point {
        return new Point(this.x + x, this.z + z);
    }
}
