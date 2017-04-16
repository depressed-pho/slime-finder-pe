import Bacon = require('baconjs');
import Point from 'slime-finder/point';

export default class CoordsModel {
    readonly changed: Bacon.Bus<any, Point>;
    readonly prop: Bacon.Property<any, Point>;

    constructor(initialCoords: Point) {
        this.changed = new Bacon.Bus<any, Point>();
        this.prop    = this.changed.toProperty(initialCoords);
    }
}
