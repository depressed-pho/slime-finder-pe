import Bacon = require('baconjs');

export interface Point {
    readonly x: number;
    readonly z: number;
};

export class Coords {
    readonly changed: Bacon.Bus<any, Point>;
    readonly prop: Bacon.Property<any, Point>;

    constructor(initial: Point) {
        this.changed = new Bacon.Bus<any, Point>();
        this.prop = this.changed.toProperty(initial);
    }
}
