import Bacon = require('baconjs');
import CoordsModel from '../model/coords';
import Point from 'slime-finder/point';

export default class AtlasModel {
    /* The center of the atlas in the world coords */
    readonly center: Bacon.Property<any, Point>;

    /* How the world coords are scaled to the local coords,
     * i.e. pixels */
    readonly scaleChanged: Bacon.Bus<any, number>;
    readonly scale: Bacon.Property<any, number>;

    constructor(coords: CoordsModel, initialScale: number) {
        /* The center of the atlas is determined by the value of
         * coords.prop property.
         */
        this.center = coords.prop;

        /* The scale of atlas is determined by the scaleChanged bus.
         */
        this.scaleChanged = new Bacon.Bus<any, number>();
        this.scale        = this.scaleChanged.toProperty(initialScale);
    }
}
