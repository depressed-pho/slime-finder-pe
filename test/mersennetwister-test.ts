import MersenneTwister = require('mersennetwister');

import 'mocha';
import chai = require('chai');
let should = chai.should();

describe('class MersenneTwister', () => {
    describe('static random()', () => {
        it('should return a number', () => {
            MersenneTwister.random().should.be.a('number');
        });
    });
    describe('int', () => {
        it('should return a 32-bit integer', () => {
            new MersenneTwister().int().should.be.a('number');
        });
        it('returns the correct random integer for a fixed seed', () => {
            let mt = new MersenneTwister(42);
            mt.int().should.equal(1608637542);
            mt.int().should.equal(3421126067);
            mt.int().should.equal(4083286876);
        });
    });
});
