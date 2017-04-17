import Chunk from 'slime-finder/chunk';
import Point from 'slime-finder/point';

import 'mocha';
import chai = require('chai');
let should = chai.should();

describe('class Chunk', () => {
    describe('constructor', () => {
        it('should normalize the chunk origin', () => {
            new Chunk(new Point( 1.5,  17)).origin.x.should.equal(  0);
            new Chunk(new Point( 1.5,  17)).origin.z.should.equal( 16);
            new Chunk(new Point(-0.1, -16)).origin.x.should.equal(-16);
            new Chunk(new Point(-0.1, -16)).origin.z.should.equal(-16);
        });
    });
    describe('isSlimy', () => {
        it('should return true for a known slime chunk', () => {
            new Chunk(new Point(1744, 48)).isSlimy.should.equal(true);
        });
        it('should return false for a known non-slime chunk', () => {
            new Chunk(new Point(1760, 48)).isSlimy.should.equal(false);
        });
    });
});
