import Chunk from 'slime-finder/chunk';

import 'mocha';
import chai = require('chai');
let should = chai.should();

describe('class Chunk', () => {
    describe('constructor', () => {
        it('should normalize the chunk origin', () => {
            new Chunk(1.5, 17).x.should.equal(0);
            new Chunk(1.5, 17).z.should.equal(16);
            new Chunk(-0.1, -16).x.should.equal(-16);
            new Chunk(-0.1, -16).z.should.equal(-16);
        });
    });
});
