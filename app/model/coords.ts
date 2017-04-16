import Bacon = require('baconjs');
import Point from 'slime-finder/point';

export default class CoordsModel {
    readonly changes: Bacon.Bus<any, (p: Point) => Point>;
    readonly prop: Bacon.Property<any, Point>;

    constructor(initialCoords: Point) {
        this.changes = new Bacon.Bus<any, (p: Point) => Point>();
        this.prop    = this.changes.scan(initialCoords, (p0, f) => {
            return f(p0);
        });
    }
}
