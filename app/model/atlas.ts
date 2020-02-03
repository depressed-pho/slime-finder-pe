import Bacon = require('baconjs');
import CoordsModel from '../model/coords';
import Point from 'slime-finder/point';

export default class AtlasModel {
    /* The center of the atlas in the world coords */
    readonly centerChanges: Bacon.Bus<(p: Point) => Point>;
    readonly center: Bacon.Property<Point>;

    /* How the world coords are scaled to the local coords,
     * i.e. pixels */
    readonly scaleChanges: Bacon.Bus<(s: number) => number>;
    readonly scale: Bacon.Property<number>;

    constructor(coords: CoordsModel, initialScale: number) {
        /* The center of the atlas is determined by the value of
         * coords.prop property.
         */
        this.centerChanges = coords.changes;
        this.center        = coords.prop;

        /* The scale of atlas is determined by the scaleChanged bus.
         */
        this.scaleChanges = new Bacon.Bus<(s: number) => number>();
        this.scale        = this.scaleChanges.scan(initialScale, (s0, f) => {
            return f(s0);
        }).skipDuplicates();
    }
}
