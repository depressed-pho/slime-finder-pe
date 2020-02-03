import _ = require('underscore');
import Bacon = require('baconjs');
import Point from 'slime-finder/point';

export default class CoordsModel {
    readonly changes: Bacon.Bus<(p: Point) => Point>;
    readonly prop: Bacon.Property<Point>;

    constructor(initialCoords: Point) {
        this.changes = new Bacon.Bus<(p: Point) => Point>();
        this.prop    = this.changes.scan(initialCoords, (p0, f) => {
            return f(p0);
        }).skipDuplicates(_.isEqual);
    }
}
