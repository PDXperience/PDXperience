const Poi = require('../lib/models/poi');
const assert = require('chai').assert;
const expect = require('chai').expect;

describe('Poi model', () => {

  it('validates with property and type', done => {
    const poi = new Poi({
      property: 'some place',
      type: 'park'
    });

    poi.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('property is required', done => {
    const poi = new Poi({
      type: 'park'
    });

    poi.validate(err => {
      assert.isOk(err, 'property should have been required');
      done();
    });
  });

  it('type is required', done => {
    const poi = new Poi({
      property: 'some place'
    });

    poi.validate(err => {
      assert.isOk(err, 'type should have been required');
      done();
    });  
  });

  it('zip must be a number', done => {
    const poi = new Poi({
      property: 'some place',
      type: 'park',
      zip: 'not a number'
    });

    poi.validate(err => {
      assert.isOk(err, 'expected error on zip data type');
      done();
    });
  });

  it('childFriendly must be a boolean', done => {
    const poi = new Poi({
      property: 'some place',
      type: 'park',
      childFriendly: true
    });

    poi.validate(err => {
      expect(poi.childFriendly).to.be.a('boolean');
      done();
    });
  });

  it ('reviews should be an array', done => {
    const poi = new Poi({
      property: 'some place',
      type: 'park',
      reviews: 'blah'
    });
    
    poi.validate(err => {
      expect(poi.reviews).to.be.an('array');
      done();
    });
  });
  
});
