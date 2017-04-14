import MersenneTwister = require('mersenne-twister');

import 'mocha';
import chai = require('chai');
let should = chai.should();

describe('class MersenneTwister', () => {
    describe('random_int', () => {
        it('should return a 32-bit integer', () => {
            new MersenneTwister().random_int().should.be.a('number');
        });
        it('returns the correct random integer for a fixed seed', () => {
            let mt = new MersenneTwister(42);
            mt.random_int().should.equal(1608637542);
            mt.random_int().should.equal(3421126067);
            mt.random_int().should.equal(4083286876);
        });
    });
});
