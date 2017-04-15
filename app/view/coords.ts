import $ = require('jquery');
import { Point } from '../model/coords';
import * as Model from '../model/coords';
import Chunk from 'slime-finder/chunk';

export class Coords {
    constructor(coords: Model.Coords) {
        let changes = $('#position-x, #position-z').asEventStream('input').map(() => {
            return <Point>{
                x: $('#position-x').val(),
                z: $('#position-z').val()
            };
        });
        coords.changed.plug(changes);

        coords.prop.onValue((p: Point) => {
            $('#position-x').val(p.x);
            $('#position-z').val(p.z);
        });

        let chunk = coords.prop.map((p: Point) => {
            return new Chunk(p.x, p.z);
        });
        chunk.onValue((c) => {
            $('#chunk-from-x').text(c.x);
            $('#chunk-from-z').text(c.z);

            $('#chunk-to-x').text(c.x + 15);
            $('#chunk-to-z').text(c.z + 15);

            if (c.isSlimy) {
                $('#chunk-is-slimy').fadeIn(50);
            }
            else {
                $('#chunk-is-slimy').fadeOut(50);
            }
        });
    }
}
