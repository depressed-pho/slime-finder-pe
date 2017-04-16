import $ = require('jquery');
import Bacon = require('baconjs');
import Point from 'slime-finder/point';
import Chunk from 'slime-finder/chunk';
import CoordsModel from '../model/coords';

export default class CoordsView {
    protected readonly changes: Bacon.EventStream<any, (p: Point) => Point>;
    protected readonly chunk: Bacon.Observable<any, Chunk>;

    constructor(coords: CoordsModel) {
        /* Whenever users directly change the value of input forms its
         * change should be propagated to the coords.changed bus.
         */
        this.changes = $('#position-x, #position-z').asEventStream('input').map(() => {
            return () => new Point(
                Number($('#position-x').val()),
                Number($('#position-z').val()));
        });
        coords.changes.plug(this.changes);

        /* The value of coords.prop property should be shown in the
         * input forms.
         */
        coords.prop.onValue((p: Point) => {
            $('#position-x').val(p.x);
            $('#position-z').val(p.z);
        });

        /* And the chunk position on the screen should also depend on
         * the coords.prop property.
         */
        this.chunk = coords.prop.map((p: Point) => {
            return new Chunk(p);
        });
        this.chunk.onValue((c) => {
            $('#chunk-from-x').text(c.origin.x);
            $('#chunk-from-z').text(c.origin.z);

            $('#chunk-to-x').text(c.origin.x + 15);
            $('#chunk-to-z').text(c.origin.z + 15);

            if (c.isSlimy) {
                $('#chunk-is-slimy').fadeIn(50);
            }
            else {
                $('#chunk-is-slimy').fadeOut(50);
            }
        });
    }
}
