import $ = require('jquery');
import Bacon = require('baconjs');
import AtlasModel  from '../model/atlas';
import CoordsModel from '../model/coords';
import Chunk       from 'slime-finder/chunk';
import Point       from 'slime-finder/point';

export default class AtlasView {
    /* The center of the atlas in the world coords */
    protected readonly center: Bacon.Observable<any, Point>;

    /* How the world coords are scaled to the local coords,
     * i.e. pixels */
    protected readonly scale: Bacon.Observable<any, number>;

    protected readonly canvas: HTMLCanvasElement;

    protected redraw(center: Point, scale: number): void {
        const ctx = this.canvas.getContext("2d");

        if (ctx) {
            /* First we need to clear the entire canvas.
             */
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            ctx.fill();

            /* For each chunk visible from the atlas we draw a rectangle
             * for it.
             */
            const topLeft = new Point(
                center.x - (this.canvas.width  / 2) / scale,
                center.z - (this.canvas.height / 2) / scale);
            const bottomRight = new Point(
                topLeft.x + this.canvas.width  / scale,
                topLeft.z + this.canvas.height / scale);

            /* A chunk is visible if any of its four corners is
             * visible.
             */
            const isPointVisible = (p: Point): boolean => {
                return p.x >= topLeft.x     && p.z >= topLeft.z
                    && p.x <  bottomRight.x && p.z <  bottomRight.z;
            };
            const isChunkVisible = (c: Chunk): boolean => {
                return isPointVisible(c.origin)
                    || isPointVisible(c.origin.offset(16,  0))
                    || isPointVisible(c.origin.offset( 0, 16))
                    || isPointVisible(c.origin.offset(16, 16));
            };
            const worldToAtlas = (p: Point): Point => {
                return new Point(
                    (p.x - topLeft.x) * scale,
                    (p.z - topLeft.z) * scale);
            };
            ctx.strokeStyle = 'black';
            ctx.fillStyle   = 'rgba(127, 255, 0, 0.4)';
            for (let c = new Chunk(topLeft); isChunkVisible(c); c = c.offset(0, 1)) {
                for (let d = c; isChunkVisible(d); d = d.offset(1, 0)) {
                    const origin = worldToAtlas(d.origin);
                    ctx.strokeRect(origin.x, origin.z, 16 * scale, 16 * scale);
                    if (d.isSlimy) {
                        ctx.fillRect(origin.x, origin.z, 16 * scale, 16 * scale);
                    }
                }
            }
        }
    }

    constructor(atlas: AtlasModel) {
        /* The center of the atlas is determined by the value of
         * atlas.center property. The same goes for the scale.
         */
        this.center = atlas.center;
        this.scale  = atlas.scale;

        this.canvas = <HTMLCanvasElement>$("#atlas").get(0);

        /* The content of atlas is determined by the center and the
         * scale. Redraw it whenever either of them changes.
         */
        Bacon.combineAsArray<any, Point|number>(this.center, this.scale).onValues((c, s) => {
            this.redraw(c, s);
        });
    }
}
